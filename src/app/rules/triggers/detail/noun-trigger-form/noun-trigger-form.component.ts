import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DecisionTableService} from '../../../../core/api/legacy/decision-table.service';
import {RuleTriggerService} from '../../../../core/api/legacy/rule-trigger.service';
import {SpinnerService} from '../../../../core/page/spinner.service';
import {InventoryService} from 'src/app/core/api/legacy/inventory.service';

/* tslint:disable:no-any */
@Component({
  selector: 'noun-trigger-form',
  templateUrl: './noun-trigger-form.component.html',
  styleUrls: ['./noun-trigger-form.component.css'],
})
export class NounTriggerFormComponent implements OnInit {
  @Input() ruleTrigger: any = {ruleId: '', nounSubcategory: '', triggerActions: true, saveReport: false};
  dTables: any[];
  nounSubcategories: any[] = ['example1', 'example2', 'example3'];

  /*****************************************************************************
                                  Service Calls
  *****************************************************************************/
  canEdit: boolean = false;
  editRuleId: string;

  /*****************************************************************************
                          Constructor, Lifecycle Hooks
  *****************************************************************************/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private decisionTableService: DecisionTableService,
    private ruleTriggerService: RuleTriggerService,
    private inventoryService: InventoryService,
    private loading: SpinnerService
  ) {}

  goBack(): void {
    this.router.navigate(['/rule-triggers']);
  }

  ngOnInit(): void {
    this.loading.show();
    this.getItem();
    this.getDTables();
    this.getNounSubcategories();
  }

  getItem(): void {
    this.loading.show();
    this.editRuleId = this.route.snapshot.paramMap.get('id');
    if (this.editRuleId === 'new') {
      // if user clicked add, not edit
      this.loading.hide();
      return;
    }
    this.canEdit = true;
    this.ruleTriggerService.getNounRuleTrigger(this.editRuleId).subscribe(i => {
      this.ruleTrigger = i[0];
      this.loading.hide();
    });
  }

  getDTables(): void {
    this.loading.show();
    this.decisionTableService.getDTables().subscribe(d => {
      this.dTables = d;
      this.loading.hide();
    });
  }

  getNounSubcategories(): void {
    this.loading.show();
    this.inventoryService.getAbstractNounSubcategories().subscribe(s => {
      this.nounSubcategories = s;
      console.log('Subcategories', this.nounSubcategories);
      this.loading.hide();
    });
  }

  saveRuleTrigger(): void {
    this.ruleTriggerService.addNounRuleTrigger(this.ruleTrigger).subscribe(res => {
      this.loading.show();
      this.goBack();
    });
  }

  removeEditedTrigger(): void {
    this.ruleTriggerService.deleteEditedNounRuleTrigger(this.editRuleId).subscribe(res => {
      this.loading.show();
    });
  }

  /*****************************************************************************
                                  Form Methods
  *****************************************************************************/
  submitForm(): void {
    if (this.ruleTrigger.ruleId && this.ruleTrigger.nounSubcategory) {
      delete this.ruleTrigger._id;
      this.saveRuleTrigger();

      if (this.canEdit) {
        this.removeEditedTrigger();
      }
    }
  }
}
