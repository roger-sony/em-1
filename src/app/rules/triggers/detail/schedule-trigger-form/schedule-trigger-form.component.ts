import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DecisionTableService} from '../../../../core/api/legacy/decision-table.service';
import {RuleTriggerService} from '../../../../core/api/legacy/rule-trigger.service';
import {SpinnerService} from '../../../../core/page/spinner.service';

/* tslint:disable:no-any */
// Added to app in angular.json, but it needs to be declared to
// prevent TypeScript compilation errors.
declare var cronstrue: any;

@Component({
  selector: 'schedule-trigger-form',
  templateUrl: './schedule-trigger-form.component.html',
  styleUrls: ['./schedule-trigger-form.component.css'],
})
export class ScheduleTriggerFormComponent implements OnInit {
  @Input() scheduledRule: any = {rule: '', schedule: '', triggerActions: true, saveReport: false};
  dTables: any[];
  // Configuration for cron-job component
  cronConfig: any = {multiple: true, bootstrap: false};

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
    private schedService: RuleTriggerService,
    private loading: SpinnerService
  ) {}

  goBack(): void {
    this.router.navigate(['/rule-triggers']);
  }

  ngOnInit(): void {
    this.loading.show();
    this.getItem();
    this.getDTables();
  }

  getItem(): void {
    this.editRuleId = this.route.snapshot.paramMap.get('id');
    if (this.editRuleId !== 'new') {
      // if the user clicked edit, not add
      this.canEdit = true;
      this.schedService.getScheduledRule(this.editRuleId).subscribe(i => {
        this.scheduledRule = i[0];
      });
    }
  }

  getDTables(): void {
    this.decisionTableService.getDTables().subscribe(d => {
      this.dTables = d;
      this.loading.hide();
    });
  }

  saveScheduledRule(): void {
    this.schedService.addScheduledRule(this.scheduledRule).subscribe(res => {
      this.loading.show();
      this.goBack();
    });
  }

  removeEditedRule(): void {
    this.schedService.deleteEditedRule(this.editRuleId).subscribe(res => {
      this.loading.show();
    });
  }

  /*****************************************************************************
                                  Form Methods
  *****************************************************************************/
  submitForm(): void {
    if (this.scheduledRule.rule && this.scheduledRule.schedule) {
      delete this.scheduledRule._id;
      this.saveScheduledRule();

      if (this.canEdit) {
        this.removeEditedRule();
      }
    }
  }

  setDisplayName(): void {
    if (!!this.scheduledRule.schedule) {
      this.scheduledRule.displayName = cronstrue.toString(this.scheduledRule.schedule);
    }
  }
}
