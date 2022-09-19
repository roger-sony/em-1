import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DecisionTableService} from '../../../../core/api/legacy/decision-table.service';
import {RuleTriggerService} from '../../../../core/api/legacy/rule-trigger.service';
import {SpinnerService} from '../../../../core/page/spinner.service';

/* tslint:disable:no-any */
@Component({
  selector: 'one-time-trigger-form',
  templateUrl: './one-time-trigger-form.component.html',
  styleUrls: ['./one-time-trigger-form.component.css'],
})
export class OneTimeTriggerFormComponent implements OnInit {
  @Input() scheduledRule: any = {rule: '', schedule: '', triggerActions: true, saveReport: false};
  dTables: any[];
  minDate = new Date();

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
    this.setMinDate();
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

  setMinDate(): void {
    const today = new Date();
    this.minDate.setDate(today.getDate() + 1);
  }

  /*****************************************************************************
                                  Form Methods
  *****************************************************************************/
  submitForm(): void {
    if (this.scheduledRule.rule && this.scheduledRule.schedule) {
      delete this.scheduledRule._id;
      // NOTE: Temporary fix due to timezone conversion issues with
      // Angular Material datepicker. See:
      // https://github.com/angular/material2/issues/7167
      const currentTimeZoneOffsetHrs = new Date(this.scheduledRule.schedule).getTimezoneOffset() / 60;
      const dateWithOffsetApplied = new Date(this.scheduledRule.schedule).setUTCHours(currentTimeZoneOffsetHrs);
      this.scheduledRule.schedule = new Date(dateWithOffsetApplied);
      this.saveScheduledRule();

      if (this.canEdit) {
        this.removeEditedRule();
      }
    }
  }

  setDisplayName(): void {
    if (!!this.scheduledRule.schedule) {
      console.log(this.scheduledRule.schedule);
      console.log(typeof this.scheduledRule.schedule);
      this.scheduledRule.displayName = `${this.scheduledRule.schedule.format('ddd, MMM D, YYYY')} (Midnight)`;
    }
  }
}
