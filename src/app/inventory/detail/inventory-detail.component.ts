import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, tap} from 'rxjs/operators';
import {DecisionTableService} from '../../core/api/legacy/decision-table.service';
import {InventoryService} from '../../core/api/legacy/inventory.service';
import {RuleTriggerService} from '../../core/api/legacy/rule-trigger.service';
import {UnitOfMeasureService} from '../../core/api/legacy/unit-of-measure.service';
import {SpinnerService} from '../../core/page/spinner.service';
import {InventoryValidator} from './inventory.validator';
import {select, Store} from '@ngrx/store';
import {GetAllChaptersAction} from '../../core/store/chapters/chapters.action';
import {Observable} from 'rxjs';
import {Chapter} from '../../core/model/chapter';
import {selectAllChapters} from '../../core/store/chapters/chapters.selector';
import {TitleService} from '../../core/page/title.service';

/* tslint:disable:no-any */
@Component({
  selector: 'inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css'],
})
export class InventoryDetailComponent implements OnInit, OnDestroy {
  objectKeys: any = Object.keys;
  item: any;
  itemDTO: any;
  today = new Date();
  itemOptions: any;
  // is form submitted
  isSubmitted: boolean = false;

  // For cloning/editing
  cloningItem: boolean = false;
  // If cloning item, we save the original item's measurement config in memory
  // in case the user will want to clone it as well.
  originalItemMeasurementConfig: any;
  cloningMeasurementConfig: boolean = false;
  cloningRuleTriggers: boolean = false;
  editingItem: boolean = false;
  // We send an array of 2 items when editing
  editItemArray: any[] = [];

  // For configuring measurement settings
  itemMeasurementConfig: any;
  loadingItemMeasurementConfig: boolean = false;
  showMeasurementSettings: boolean = false;

  // For configuring rule triggers
  dTables: any[];
  ruleTriggers: any[];
  ruleTriggersDTO: any[];
  savedRuleTriggers: any[];
  initialRuleTriggers: boolean = true;

  public chapters$: Observable<Chapter[]>;

  private previousSubcategory: string;

  /*******************************************************************************
   Form
   *******************************************************************************/
  inventoryForm = this.fb.group({
    category: ['', Validators.required],
    color: [''],
    expiry_date: [],
    location: [''],
    maker: ['', Validators.required],
    master_item: [''],
    model: [''],
    perishable: [false, Validators.required],
    // TODO: This is probably why the field shows up red. Change to default 1?
    qty: [{value: 0, disabled: true}, [Validators.required]],
    sku: [''],
    source: ['', Validators.required],
    typeAndSubcategory: this.fb.group(
      {
        subcategory: ['', Validators.required],
        type: ['concrete', Validators.required],
      },
      {asyncValidators: this.validator.validate.bind(this)}
    ),
    _trigger: ['Setup', Validators.required],
    _display_name: [''],
    _transaction_type: [''],
    edit_reason: [''],
    unit_of_measure: ['', Validators.required],
    ruleTriggers: this.fb.array([]),
    _chapterIDs: [''],
  });

  get f() {
    return this.inventoryForm.controls;
  }

  get ts() {
    return this.inventoryForm.get('typeAndSubcategory');
  }

  get typeCtrl() {
    return this.inventoryForm.get('typeAndSubcategory.type');
  }

  get subcategoryCtrl() {
    return this.inventoryForm.get('typeAndSubcategory.subcategory');
  }

  /******************************************************************************
   Rule Trigger Table
   *******************************************************************************/
  ruleTriggerFormArray: any;
  ruleTriggerDataSource: MatTableDataSource<any>;
  displayedColumns = ['ruleId', 'saveReport', 'triggerActions', 'remove'];

  /*****************************************************************************
   Constructor, Lifecycle Hooks
   *****************************************************************************/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    private dTableService: DecisionTableService,
    private uomService: UnitOfMeasureService,
    private ruleTriggerService: RuleTriggerService,
    private validator: InventoryValidator,
    private fb: FormBuilder,
    private location: Location,
    private changeDetector: ChangeDetectorRef,
    private loading: SpinnerService,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {
    // Force route reload whenever URL params change
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getItem();
    this.getItemOptions();
    this.getDecisionTables();

    // Form change listeners
    this.onPerishableChange();
    this.onTypeChange();

    this.store$.dispatch(new GetAllChaptersAction({}));
    this.chapters$ = this.store$.pipe(select(selectAllChapters));
  }

  ngOnDestroy(): void {
    this.loading.hide();
    if (!this.isSubmitted) {
      // Clean up unit of measure if user leaves the form without the
      // UOM's noun_subcategory being created.
      const measurementConfigExists = this.itemMeasurementConfig && this.itemMeasurementConfig._id;
      const subcategoryExists = this.itemOptions.subcategory.includes(this.subcategoryCtrl.value);
      if (measurementConfigExists && !subcategoryExists) {
        this.uomService.deleteMeasurementConfig(this.itemMeasurementConfig._id).subscribe(res => {
          console.log('Unit of Measure was deleted.');
        });
      }
    }
  }

  /*******************************************************************************
   Service Calls
   *******************************************************************************/
  goBack(): void {
    const returnTo = this.route.snapshot.queryParamMap.get('returnTo');
    if (returnTo) {
      this.router.navigateByUrl(returnTo);
    } else {
      this.location.back();
    }
  }

  getItem(): void {
    this.loading.show();
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.titleService.setPageTitle('Add Noun');
      this.item = {};
      this.loading.hide();
      return;
    }
    // if the user clicked clone/edit, not add
    if (id !== 'new') {
      this.loading.show();
      this.editingItem = !!this.route.snapshot.paramMap.get('edit');
      this.cloningItem = !this.editingItem;
      this.inventoryService.getItem(id).subscribe(i => {
        // Clean up item fields for cloning/editing
        i[0]._trigger = this.editingItem ? 'Edit' : 'Purchase';
        delete i[0].__v;
        delete i[0].last_updated;
        // NOTE: Temporary fix due to timezone conversion issues with
        // Angular Material datepicker. See:
        // https://github.com/angular/material2/issues/7167
        if (i[0].expiry_date) {
          const localHours = new Date(i[0].expiry_date).getHours();
          const correctHours = new Date(i[0].expiry_date).setHours(localHours + 12);
          i[0].expiry_date = new Date(correctHours);
        }
        // If editing, copy item so it can be consumed & replaced
        if (this.editingItem) {
          i[0].edit_reason = 'Correction'; // default edit reason
          this.generateConsumedItemForEdit(JSON.parse(JSON.stringify(i[0])));
        }
        // Delete id from item after copying for edit
        delete i[0]._id;
        this.item = i[0];
        // If cloning, get original UOM to clone
        if (this.cloningItem) {
          this.getOriginalMeasurementConfig();
        }
        // Loop over formControls and prefill existing values
        this.objectKeys(this.item).forEach((attr: string) => {
          if (this.inventoryForm.get(attr)) {
            this.inventoryForm.get(attr).setValue(this.item[attr]);
          }
        });
        this.typeCtrl.setValue(this.item.type || 'concrete');
        this.subcategoryCtrl.setValue(this.item.subcategory);
        this.titleService.setPageTitle(this.item.subcategory, 'Nouns');
        if (this.item.type === 'abstract') {
          this.getRuleTriggers();
        }
        this.getMeasurementConfig(this.item.subcategory);
        this.f.qty.enable();
        this.f.qty.markAsTouched();
        this.loading.hide();
      });
    }
  }

  getOriginalMeasurementConfig(): void {
    this.uomService.getUOMByNounSubcategory(this.item.subcategory).subscribe(m => {
      this.originalItemMeasurementConfig = m;
    });
  }

  getMeasurementConfig(subcategory: string): void {
    this.loadingItemMeasurementConfig = true;
    this.showMeasurementSettings = false;
    this.uomService.getUOMByNounSubcategory(subcategory).subscribe(m => {
      if (this.cloningItem) {
        const newSubcategory = this.item.subcategory !== this.subcategoryCtrl.value;
        const noExistingMeasurementConfig = m.length === 0;
        if (newSubcategory && noExistingMeasurementConfig) {
          this.cloningMeasurementConfig = true;
          this.itemMeasurementConfig = {
            noun_subcategory: subcategory,
            display_name: this.originalItemMeasurementConfig.display_name,
            type: this.originalItemMeasurementConfig.type,
            range_config: this.originalItemMeasurementConfig.range_config,
          };
          this.inventoryForm.setErrors({cloningMeasurementConfig: true});
          this.changeDetector.detectChanges();
          this.loadingItemMeasurementConfig = false;
          return;
        }
      }
      if (!(m.length === 0)) {
        this.cloningMeasurementConfig = false;
        this.itemMeasurementConfig = m;
        // Ensure noun unit_of_measure field is in sync with measurement
        // config. Eventually, the noun unit_of_measure field may be removed.
        this.f.unit_of_measure.setValue(m.display_name);
        this.f.qty.enable();
        // this.f.qty.markAsTouched();
      } else {
        this.itemMeasurementConfig = {
          noun_subcategory: subcategory,
          display_name: null,
          type: 'number',
        };
      }
      this.loadingItemMeasurementConfig = false;
      this.showMeasurementSettings = true;
    });
  }

  updateMeasurementConfig(config: any): void {
    console.log('Updating Measurement Config??', config);
    console.log('Old Config', this.itemMeasurementConfig);
    this.itemMeasurementConfig.display_name = config.display_name;
    this.itemMeasurementConfig.type = config.type;
    this.itemMeasurementConfig.noun_subcategory = config.noun_subcategory;
    if (this.itemMeasurementConfig.type === 'range') {
      this.itemMeasurementConfig.range_config = config.range_config;
    }
    this.itemMeasurementConfig.updated = true;
    console.log('New Config', this.itemMeasurementConfig);
    this.f.unit_of_measure.setValue(config.display_name);
    this.f.qty.enable();
  }

  getRuleTriggers(): void {
    if (this.subcategoryCtrl.value.length === 0) {
      return;
    }
    this.ruleTriggerService.getNounRuleTriggerBySubcategory(this.subcategoryCtrl.value).subscribe(r => {
      this.ruleTriggers = r;
      this.cloningRuleTriggers =
        this.cloningItem && this.savedRuleTriggers && this.savedRuleTriggers.length > 0 ? true : false;
      if (this.initialRuleTriggers) {
        this.savedRuleTriggers = this.ruleTriggers.slice(0);
        this.initialRuleTriggers = false;
      }
      this.setInitialRuleTriggerOptions();
    });
  }

  getItemOptions(): void {
    this.loading.show();
    this.inventoryService.getFieldValues().subscribe(v => {
      this.itemOptions = v;
      this.loading.hide();
    });
  }

  getDecisionTables(): void {
    this.loading.show();
    this.dTableService.getDTables().subscribe(d => {
      this.dTables = d;
      this.loading.hide();
    });
  }

  saveItem() {
    this.loading.show();
    if (this.editingItem) {
      this.editItemArray[0].edit_reason = this.itemDTO.edit_reason;
      this.editItemArray.push(this.itemDTO);
      this.inventoryService.editItem(this.editItemArray).subscribe(res => {
        this.goBack();
      });
    } else {
      // If new item or clone
      this.inventoryService.addItem(this.itemDTO).subscribe(res => {
        // NOTE: Hack bc I was receiving backend response before db update completed--caused inventory table not to display the item update until manually refreshed.
        setTimeout(() => this.goBack(), 2500);
      });
    }
  }

  saveMeasurementSettings(): void {
    if (!this.cloningItem && !this.itemMeasurementConfig.updated) {
      return;
    }
    delete this.itemMeasurementConfig.updated;
    if (this.itemMeasurementConfig._id) {
      console.log('Updating config');
      this.uomService.updateMeasurementConfig(this.itemMeasurementConfig).subscribe(
        res => {
          console.log('RESPONSE:', res);
        },
        err => {
          console.error('ERROR:', err);
        }
      );
    } else {
      console.log('Adding new config');
      this.uomService.addMeasurementConfig(this.itemMeasurementConfig).subscribe(
        res => {
          console.log('RESPONSE:', res);
        },
        err => {
          console.error('ERROR:', err);
        }
      );
    }
  }

  saveRuleTriggers(goBack: boolean) {
    if (this.ruleTriggersDTO && this.ruleTriggersDTO.length > 0) {
      this.ruleTriggersDTO.forEach(r => {
        if (r._id) {
          this.ruleTriggerService.updateNounRuleTrigger(r).subscribe(res => {
            console.log('Updated rule trigger');
            /*TODO: Handle errors? We've got the message component to
            display errors, but maybe we should do something else too.*/
          });
        } else {
          this.ruleTriggerService.addNounRuleTrigger(r).subscribe(res => {
            console.log('Added new rule trigger');
            if (goBack) {
              this.goBack();
            }
            /*TODO: Handle errors? We've got the message component to
            display errors, but maybe we should do something else too.*/
          });
        }
      });
      if (goBack) {
        this.goBack();
      }
    }
  }

  generateConsumedItemForEdit(item: any): void {
    item._transaction_type = 'consumed';
    item.qty = parseFloat(item.qty);
    this.editItemArray.push(item);
  }

  async onSubmit() {
    const formTouched = await this.checkForm();
    this.isSubmitted = true;
    this.itemDTO = await this.addFormValuesToItemDTO();
    this.itemDTO._display_name = await this.generateDisplayName();
    if (this.itemDTO.type === 'abstract') {
      this.ruleTriggersDTO = await this.addFormValuesToRuleTriggersDTO();
    }
    /* NOTE: There are 2 transaction types: delivered & consumed.
     Delivered means increment total qty, consumed means decrement total qty
     Inventory Formula: Available = Delivered - Consumed */
    this.itemDTO._transaction_type = 'delivered';
    this.itemDTO.qty = parseFloat(this.f.qty.value);
    this.saveMeasurementSettings();
    if (!formTouched.noun && formTouched.ruleTriggers) {
      this.saveRuleTriggers(true);
      return;
    } else if (formTouched.noun && !formTouched.ruleTriggers) {
      this.saveItem();
      return;
    } else {
      this.saveItem();
      this.saveRuleTriggers(false);
    }
  }

  async checkForm() {
    const touchedObj = {noun: false, ruleTriggers: false};
    if (!this.inventoryForm.controls.ruleTriggers.pristine) {
      touchedObj.ruleTriggers = true;
    }
    for (const item in this.inventoryForm.controls) {
      if (!this.inventoryForm.controls[item].pristine && item !== 'ruleTriggers') {
        touchedObj.noun = true;
        break;
      }
    }
    return touchedObj;
  }

  async addFormValuesToItemDTO() {
    const itemDTO: any = {};
    for await (const key of this.objectKeys(this.f)) {
      const value = this.f[key]['value'];
      if (typeof value === 'string' && value.length > 0) {
        // Capitalize 1st letter of any string values (client request)
        itemDTO[key] = value.charAt(0).toUpperCase() + value.substr(1);
      } else if (key === 'typeAndSubcategory') {
        itemDTO.type = value.type;
        itemDTO.subcategory = value.subcategory;
      } else if (value || typeof value === 'boolean') {
        itemDTO[key] = value;
      }
    }
    return itemDTO;
  }

  async addFormValuesToRuleTriggersDTO() {
    const ruleTriggersDTO: any[] = [];
    if (!this.ruleTriggerFormArray || this.ruleTriggerFormArray.controls.length < 1) {
      return ruleTriggersDTO;
    }
    for await (const r of this.ruleTriggerFormArray.controls) {
      const ruleTrigger: any = {
        nounSubcategory: this.itemDTO.subcategory,
        ruleId: r.controls.ruleId.value,
        saveReport: r.controls.saveReport.value,
        triggerActions: r.controls.triggerActions.value,
      };
      if (r.controls._id.value) {
        ruleTrigger._id = r.controls._id.value;
      }
      ruleTriggersDTO.push(ruleTrigger);
    }
    return ruleTriggersDTO;
  }

  async generateDisplayName() {
    let displayName = `${this.itemDTO.maker}, ${this.itemDTO.subcategory}, by ${this.itemDTO.unit_of_measure}`;
    if (this.itemDTO.location && !!this.itemDTO.location) {
      displayName += `, in ${this.itemDTO.location}`;
    }
    return displayName;
  }

  cloneMeasurementConfig(clone: boolean): void {
    delete this.itemMeasurementConfig._id;
    delete this.itemMeasurementConfig._version;
    delete this.itemMeasurementConfig._dateCreated;
    delete this.itemMeasurementConfig.__v;
    this.itemMeasurementConfig.noun_subcategory = this.subcategoryCtrl.value;
    // If not cloning, reset measurement config values
    if (!clone) {
      (this.itemMeasurementConfig.display_name = ''), (this.itemMeasurementConfig.type = 'number');
      this.itemMeasurementConfig.range_config = [];
    }
    this.cloningMeasurementConfig = false;
    this.showMeasurementSettings = true;
    this.inventoryForm.setErrors({cloningMeasurementConfig: null});
    this.changeDetector.detectChanges();
  }

  cloneRuleTriggers(clone: boolean): void {
    if (!clone) {
      this.ruleTriggers = [];
      this.setInitialRuleTriggerOptions();
      this.addRuleTrigger({
        ruleId: '',
        nounSubcategory: this.subcategoryCtrl.value,
        saveReport: false,
        triggerActions: true,
      });
    } else {
      this.ruleTriggers = this.savedRuleTriggers.slice(0);
      this.setInitialRuleTriggerOptions();
    }
    this.cloningRuleTriggers = false;
  }

  /*******************************************************************************
   Form Change Listeners
   *******************************************************************************/
  onPerishableChange(): void {
    this.f.perishable.valueChanges.subscribe(val => {
      if (!val && this.f.expiry_date) {
        this.f.expiry_date.reset();
      }
    });
  }

  public onSubcategoryValueChange(value: string) {
    if (value !== (this.previousSubcategory || this.item?.subcategory)) {
      this.previousSubcategory = value;
      this.getMeasurementConfig(value);
      this.getRuleTriggers();
    }
  }

  onTypeChange(): void {
    this.typeCtrl.valueChanges
      .pipe(
        tap(_ => (this.loadingItemMeasurementConfig = true)),
        debounceTime(300)
        // TODO: Refactor to pull "val" from this.subcategoryCtrl.value
        // rather than passing as an argument.
      )
      .subscribe(val => {
        if (this.subcategoryCtrl.value) {
          this.getMeasurementConfig(this.subcategoryCtrl.value);
          this.getRuleTriggers();
        }
      });
  }

  setInitialRuleTriggerOptions(): void {
    // Reset rule trigger form array
    while (this.ruleTriggerFormArray && this.ruleTriggerFormArray.length) {
      this.ruleTriggerFormArray.removeAt(0);
    }
    // If item is concrete, do nothing
    if (this.typeCtrl.value === 'concrete') {
      return;
    }
    // If item has rule triggers already, add them to the form
    if (this.ruleTriggers && this.ruleTriggers.length > 0) {
      this.ruleTriggers.forEach(option => {
        this.addRuleTrigger(option);
      });
    }
  }

  addRuleTrigger(trigger: any): void {
    this.ruleTriggerFormArray = this.inventoryForm.get('ruleTriggers') as FormArray;
    // Add rule trigger to form array
    this.ruleTriggerFormArray.push(
      this.fb.group({
        ruleId: [trigger.ruleId, Validators.required],
        nounSubcategory: [trigger.nounSubcategory, Validators.required],
        saveReport: [trigger.saveReport, Validators.required],
        triggerActions: [trigger.triggerActions, Validators.required],
        _id: [trigger._id],
      })
    );
    // Update table with new ruleTriggers array
    this.ruleTriggerDataSource = new MatTableDataSource(this.ruleTriggerFormArray.controls);
  }

  deleteRuleTrigger(index: number): void {
    if (confirm('Are you sure you want to delete this rule trigger?')) {
      const ruleTriggerId = this.ruleTriggerFormArray.at(index).controls._id.value;
      if (ruleTriggerId) {
        this.ruleTriggerService.deleteNounRuleTrigger(ruleTriggerId).subscribe(res => {
          console.log(res);
        });
      }
      this.ruleTriggerFormArray.removeAt(index);
      this.ruleTriggerDataSource = new MatTableDataSource(this.ruleTriggerFormArray.controls);
    }
  }
}
