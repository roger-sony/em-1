import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DecisionTableService} from '../../../core/api/legacy/decision-table.service';
import {InventoryService} from '../../../core/api/legacy/inventory.service';
import {UnitOfMeasureService} from '../../../core/api/legacy/unit-of-measure.service';
import {TaskService} from '../../../core/api/legacy/task.service';
import {MatTableDataSource} from '@angular/material/table';
import {AutocompleteNounFilterService} from '../../../services/autocomplete-noun-filter.service';
import {SpinnerService} from '../../../core/page/spinner.service';
import {TitleService} from '../../../core/page/title.service';
import {DecisionTableRuleDto} from '../../../core/api/dto/decision-table.dto';
import {RangeConfigDto, UnitOfMeasureDto} from '../../../core/api/dto/unit-of-measure.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'decision-table-detail',
  templateUrl: './decision-table-detail.component.html',
  styleUrls: ['./decision-table-detail.component.css'],
})
export class DecisionTableDetailComponent implements OnInit, OnDestroy {
  objectKeys: any = Object.keys;
  dTableConfig: any;
  originalDisplayName: string;
  saveSuccess: boolean;
  viewingSaveModal: boolean = false;
  viewingDeleteModal: boolean = false;
  saveAsNewTable: boolean;

  /* "Display Filter" - a Universal Filter that Limits Options Displayed in D-Table */
  initialFacts: any[] = [
    {display_name: 'All Nouns', name: '__v', operation: '$eq', value: '0'},
    {display_name: 'All Active Nouns', name: '__v', operation: '$eq', value: '0'},
    {display_name: 'All Perishable Nouns', name: 'perishable', operation: '$eq', value: 'true'},
  ];
  initialFactFilter: any;

  /* Universal Filters - Applied to Every D-Table Rule */
  universalFilters: any[] = [];
  universalFilterName: string = '';
  universalFilterOperation: string = '';
  universalFilterValue: string = '';

  /* Inventory Item Info */
  inventoryFieldNames: string[];
  inventoryFieldOptions: any;
  itemMeasurementSettings: any;

  /* Possible Actions to Trigger - Currently just tasks */
  consequenceOptions: any[] = [];

  /* Associated Rule Triggers - shown when deleting a table */
  ruleTriggers: any[];

  skedDayOptions: any = [
    {day: 'Current Sked', value: 'Current Sked'},
    {day: 'Monday', value: 'MO'},
    {day: 'Tuesday', value: 'TU'},
    {day: 'Wednesday', value: 'WE'},
    {day: 'Thursday', value: 'TH'},
    {day: 'Friday', value: 'FR'},
    {day: 'Saturday', value: 'SA'},
    {day: 'Sunday', value: 'SU'},
  ];

  skedTimeOptions: any = [
    {time: '12am', value: '01'},
    {time: '2am', value: '02'},
    {time: '4am', value: '03'},
    {time: '6am', value: '04'},
    {time: '8am', value: '05'},
    {time: '10am', value: '06'},
    {time: '12pm', value: '07'},
    {time: '2pm', value: '08'},
    {time: '4pm', value: '09'},
    {time: '6pm', value: '10'},
    {time: '8pm', value: '11'},
    {time: '10pm', value: '12'},
  ];

  canView: boolean = false;
  autocompleteNounFilterSubscription: any;
  activeFilterOptions: string[];
  inactiveFilterOptions: string[];

  /******************************************************************************
                            Table Configuration
******************************************************************************/
  displayedColumns: string[] = [];
  dataSource: any = [];

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(
    private route: ActivatedRoute,
    private dTableService: DecisionTableService,
    private inventoryService: InventoryService,
    private uomService: UnitOfMeasureService,
    private taskService: TaskService,
    private location: Location,
    private autocompleteNounFilterService: AutocompleteNounFilterService,
    private loading: SpinnerService,
    private titleService: TitleService
  ) {}

  goBack(): void {
    this.location.back();
  }

  async ngOnInit() {
    this.loading.show();
    this.saveSuccess = false;
    this.dTableConfig = {
      display_name: '',
      ref_fact: [],
      table_rules: [{config_name: '', consequence: {}, fact_filter: []}],
    };
    await this.getTasks();
    await this.getDecisionTable();
    this.getInventoryFieldValues();
    this.getItemMeasurementSettings();
    this.autocompleteNounFilterSubscriber();
  }

  ngOnDestroy(): void {
    this.autocompleteNounFilterService.changeMessage({input: null, index: null});
    this.autocompleteNounFilterSubscription.unsubscribe();
  }

  initializeDecisionTable(): void {
    this.displayedColumns = ['subcategory', 'filters', 'action', 'delete_rule'];
    this.dataSource = new MatTableDataSource(this.dTableConfig.table_rules);
    this.dTableConfig.table_rules.forEach((rule: any) => {
      rule.selectNameError = false;
      rule.selectValueError = false;
      rule.selectOperationError = false;
      if (rule.sked && rule.sked.length === 4) {
        rule.selectedDay = rule.sked.slice(0, 2);
        rule.selectedTime = rule.sked.slice(2, 4);
      } else {
        rule.sked = 'Current Sked';
        rule.selectedDay = 'Current Sked';
      }
    });
    this.loading.hide();
  }

  /*******************************************************************************
                              Click Handlers
*******************************************************************************/
  addRule(): void {
    this.dTableConfig['table_rules'].push({config_name: '', consequence: {}, fact_filter: []});
    this.initializeDecisionTable();
  }

  addUniversalFilter(): void {
    this.dTableConfig['ref_fact'].push({
      name: this.universalFilterName,
      operation: this.universalFilterOperation,
      value: this.universalFilterValue.toString(),
    });
    this.universalFilterName = '';
    this.universalFilterOperation = '';
    this.universalFilterValue = '';
  }

  deleteUniversalFilter(filter: any): void {
    console.log('--Removing universal filter....');
    this.dTableConfig.ref_fact = this.dTableConfig.ref_fact.filter((f: any) => f !== filter);
  }

  addFilterToRule(rule: any) {
    rule.fact_filter.push({
      name: rule.filterName,
      operation: rule.filterOperation,
      value: rule.filterValue.toString(),
    });
    rule.filterName = '';
    rule.filterOperation = '';
    rule.filterValue = '';
  }

  deleteFilterFromRule(filter: any, rule: any): void {
    console.log('--Removing rule filter....');
    rule.fact_filter = rule.fact_filter.filter((f: any) => f !== filter);
  }

  deleteRule(rule: any): void {
    if (confirm(`Are you sure you want to delete this rule?`)) {
      console.log('--Removing rule....');
      this.dTableConfig.table_rules = this.dTableConfig.table_rules.filter((r: any) => r !== rule);
    }
    this.initializeDecisionTable();
  }

  handleSelect(selection: string): void {
    this.universalFilterValue = '';
    // Only some fields can use > or < comparators. Most should default to =
    const comparableFields = ['qty', 'expiry_date', 'last_updated'];
    const fieldIsComparable = comparableFields.includes(selection);
    this.universalFilterOperation = fieldIsComparable ? '' : '$eq';
    // TODO: Figure out how this was working.
    // selection.selectNameError = false;
    // selection.selectValueError = false;
    // selection.selectOperationError = false;
  }

  handleSelectTable(selection: any, index: number): void {
    console.log('Subcategory', selection.config_name);
    this.autocompleteNounFilterService.changeMessage({input: null, index: index});
    selection.filterValue = '';
    if (this.dTableConfig.table_rules[index].config_name) {
      this.getSubcategoryFields(index, selection.filterName);
    }
    switch (selection.filterName) {
      case 'expiry_date':
        selection.filterOperation = '';
        break;
      case '_last_updated':
        selection.filterOperation = '';
        break;
      case 'qty':
        // TODO: might need to extract to separate method
        const measurementConfig = this.itemMeasurementSettings[selection.config_name];
        console.log('measurement config is', measurementConfig);
        if (measurementConfig && measurementConfig.type === 'range') {
          selection.filterOperation = '$eq';
        } else {
          selection.filterOperation = '';
        }
        break;
      default:
        selection.filterOperation = '$eq';
    }

    selection.selectNameError = false;
    selection.selectValueError = false;
    selection.selectOperationError = false;
  }

  handleValueChange(selection: any): void {
    selection.selectValueError = false;
  }

  confirmDeleteDecisionTable(): void {
    this.viewingDeleteModal = true;
    this.loading.show();
    this.dTableService.getRelatedData(this.dTableConfig._id).subscribe(r => {
      this.ruleTriggers = r;
      this.loading.hide();
    });
  }

  /*******************************************************************************
                                Form Methods
*******************************************************************************/
  saveDecisionTableCheck(saveAs?: boolean): void {
    this.saveAsNewTable = saveAs ? true : false;
    let canSave: boolean = true;
    const ruleArray: DecisionTableRuleDto[] = [];
    for (const rule of this.dTableConfig.table_rules) {
      let count = 0;
      if (rule.filterName) {
        count++;
      }
      if (rule.filterOperation) {
        count++;
      }
      if (rule.filterValue) {
        count++;
      }
      if (count === 1 || count === 2) {
        canSave = false;
        if (!rule.filterName) {
          rule.selectNameError = true;
        }
        if (!rule.filterOperation) {
          rule.selectOperationError = true;
        }
        if (!rule.filterValue) {
          rule.selectValueError = true;
        }
      } else if (count === 3) {
        ruleArray.push(rule);
      }
    }
    if (!canSave) {
      ruleArray.forEach(rule => this.addFilterToRule(rule));
      this.toggleSaveModal();
    } else {
      ruleArray.forEach(rule => this.addFilterToRule(rule));
      this.saveDecisionTable();
    }
  }

  saveDecisionTable(): void {
    const dTableConfig = JSON.parse(JSON.stringify(this.dTableConfig));
    dTableConfig.ref_fact.push(this.initialFactFilter);
    const cleanedTableRules = dTableConfig.table_rules.map((rule: any) => {
      delete rule.filterName;
      delete rule.filterOperation;
      delete rule.filterValue;
      delete rule.selectNameError;
      delete rule.selectOperationError;
      delete rule.selectValueError;
      delete rule.selectedDay;
      delete rule.selectedTime;
      delete rule.activeOptions;
      delete rule.inactiveOptions;
      return rule;
    });
    Promise.all(cleanedTableRules).then(tableRules => {
      dTableConfig.table_rules = tableRules;
      if (this.saveAsNewTable) {
        if (dTableConfig.display_name === this.originalDisplayName) {
          this.toggleSaveModal();
          alert('Uh oh, please change the table name if you want to save it as a new table.');
          return;
        }
      }
      if (this.saveAsNewTable) {
        this.toggleSaveModal();
        if (confirm('This will create a new table, not update your existing one. Are you sure?')) {
          delete dTableConfig._id;
        }
      }
      this.postDecisionTable(dTableConfig);
    });
  }

  /*******************************************************************************
                                Service Calls
*******************************************************************************/
  async getDecisionTable() {
    this.loading.show();
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      // if the user clicked edit, not add
      console.log('--Getting existing dtable....');
      this.dTableService.getDTable(id).subscribe(d => {
        this.dTableConfig = d[0];
        console.log('Dtable is', this.dTableConfig);
        this.originalDisplayName = this.dTableConfig.display_name;
        this.titleService.setPageTitle(this.originalDisplayName, 'Decision Tables');
        // Pop the initial fact from the ref_fact, and assign the matching
        // initialFact to the initialFactFilter
        const initialFact = this.dTableConfig.ref_fact.pop();
        this.initialFactFilter = this.initialFacts.find(e => {
          return e.display_name === initialFact.display_name;
        });
        this.getInventoryFieldValues(); // update field values with initialFactFilter
        this.loading.hide();
      });
    } else {
      this.titleService.setPageTitle('Create Decision Table');
      this.initialFactFilter = this.initialFacts[0];
      this.getInventoryFieldValues(); // update field values with initialFactFilter
      this.canView = true;
      this.loading.hide();
    }
  }

  getInventoryFieldValues(): void {
    this.loading.show();
    if (!this.initialFactFilter || this.initialFactFilter.name === '__v') {
      this.inventoryService.getFieldValues().subscribe(v => {
        this.inventoryFieldOptions = v;
        this.inventoryFieldNames = this.objectKeys(v);
        this.inventoryFieldNames.push('expiry_date', '_last_updated', 'qty');
        this.inventoryFieldNames = this.inventoryFieldNames.filter(
          i => i !== '_trigger' && i !== 'unit_of_measure' && i !== 'subcategory'
        );
        this.initializeDecisionTable();
        this.loading.hide();
      });
    } else {
      const n = this.initialFactFilter.name;
      const v = this.initialFactFilter.value;
      this.inventoryService.getFieldValues(n, v).subscribe(f => {
        this.inventoryFieldOptions = f;
        this.inventoryFieldNames = this.objectKeys(f);
        this.inventoryFieldNames.push('expiry_date', '_last_updated', 'qty');
        this.inventoryFieldNames = this.inventoryFieldNames.filter(
          i => i !== '_trigger' && i !== 'unit_of_measure' && i !== 'subcategory'
        );
        this.inventoryFieldNames.sort();
        this.initializeDecisionTable();
        this.loading.hide();
      });
    }
  }

  getItemMeasurementSettings(): void {
    this.loading.show();
    this.uomService.getUOMConfigs().subscribe(c => {
      this.itemMeasurementSettings = c.reduce(
        (map: Record<string, UnitOfMeasureDto>, obj) => ((map[obj.noun_subcategory] = obj), map),
        {}
      );
      this.loading.hide();
    });
  }

  async getTasks() {
    this.loading.show();
    this.taskService.getTasks().subscribe(t => {
      this.consequenceOptions = t;
      this.checkConsequenceID();
    });
  }

  postDecisionTable(dt: any): void {
    if (dt._id) {
      // Update existing table
      this.dTableService.updateDTable(dt).subscribe(res => {
        if (res) {
          this.saveSuccess = true;
          this.goBack();
        }
      });
    } else {
      // Create new table
      this.dTableService.addDTable(dt).subscribe(res => {
        if (res) {
          this.saveSuccess = true;
          this.goBack();
        }
      });
    }
  }

  deleteDecisionTable(): void {
    this.loading.show();
    this.dTableService.deleteDTable(this.dTableConfig._id).subscribe(res => {
      console.log('-- Success! Deleted D-table.');
      this.loading.hide();
      this.goBack();
    });
  }

  getSubcategoryFields(index: number, filterName: string): void {
    console.log('--Fetching Subcategory Fields');
    if (filterName === 'qty' || filterName === '_last_updated' || filterName === 'expiry_date') {
      this.dTableConfig.table_rules[index].activeOptions = [];
      this.dTableConfig.table_rules[index].inactiveOptions = [];
      return;
    }
    this.inventoryService
      .getFieldValuesForSubcategory(this.dTableConfig.table_rules[index].config_name)
      .subscribe(i => {
        console.log('other', i);
        this.dTableConfig.table_rules[index].activeOptions = i.active[filterName];
        this.dTableConfig.table_rules[index].inactiveOptions = i.inactive[filterName];
        this.activeFilterOptions = [...i.active[filterName]];
        this.inactiveFilterOptions = [...i.inactive[filterName]];
      });
  }

  /*******************************************************************************
                              Utilities
*******************************************************************************/
  getMeasurementValue(subcategory: string, qty: number): string | number {
    if (this.itemMeasurementSettings[subcategory] && this.itemMeasurementSettings[subcategory].type === 'range') {
      const valueObj = this.itemMeasurementSettings[subcategory].range_config.find(
        (c: RangeConfigDto) => c.value === qty
      );
      if (valueObj && valueObj.display_value) {
        return valueObj.display_value;
      } else {
        return 'ERROR - Value no longer exists on this noun. Please delete & remake this rule condition.';
      }
    }
    return qty;
  }

  toggleSaveModal(): void {
    this.viewingSaveModal ? (this.viewingSaveModal = false) : (this.viewingSaveModal = true);
  }

  handleScheduleChange(e: any): void {
    if (e.selectedDay === 'Current Sked') {
      e.sked = `${e.selectedDay}`;
      e.selectedTime = '';
      return;
    } else if (e.selectedDay && e.selectedTime) {
      e.sked = `${e.selectedDay}${e.selectedTime}`;
      return;
    } else if (e.selectedDay !== 'Current Sked') {
      e.selectedTime = '01';
    }
  }

  handleConsequenceChange(element: DecisionTableRuleDto, event: number): void {
    element.consequence = this.consequenceOptions[event]._id;
  }

  async checkConsequenceID() {
    await this.consequenceOptions.map(c => {
      this.consequenceOptions[c._id] = c;
      this.consequenceOptions[c.shortTask] = c;
    });
    await this.dTableConfig.table_rules.map((r: any) => {
      if (!this.consequenceOptions[r.consequence]) {
        r.consequence = '';
      }
    });
    this.canView = true;
    this.loading.hide();
  }

  autocompleteNounFilterSubscriber(): void {
    this.autocompleteNounFilterSubscription = this.autocompleteNounFilterService.currentMessage.subscribe(message => {
      if (message.input && message.index >= 0) {
        this.dTableConfig.table_rules[message.index].filterValue = message.input;
      }
      if (this.activeFilterOptions && this.inactiveFilterOptions && message.input) {
        this.dTableConfig.table_rules[message.index].activeOptions = this.activeFilterOptions.filter(option =>
          option.toLowerCase().includes(message.input.toLowerCase())
        );
        this.dTableConfig.table_rules[message.index].inactiveOptions = this.inactiveFilterOptions.filter(option =>
          option.toLowerCase().includes(message.input.toLowerCase())
        );
        return;
      }
    });
  }
}
