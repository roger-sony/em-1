import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SpinnerService} from '../../../core/page/spinner.service';
import {TitleService} from '../../../core/page/title.service';

@Component({
  selector: 'rule-trigger-detail',
  templateUrl: './rule-trigger-detail.component.html',
  styleUrls: ['./rule-trigger-detail.component.scss'],
})
export class RuleTriggerDetailComponent implements OnInit {
  ruleTriggerId: string;
  ruleTriggerType: string;

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
    private location: Location,
    private loading: SpinnerService,
    private titleService: TitleService
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.loading.show();
    this.getRuleTrigger();
  }

  getRuleTrigger(): void {
    this.ruleTriggerId = this.route.snapshot.paramMap.get('id');
    this.ruleTriggerType = this.route.snapshot.paramMap.get('type');
    console.log('--Rule Trigger ID is', this.ruleTriggerId);
    console.log('--Rule Trigger Type is', this.ruleTriggerType);
    if (this.ruleTriggerId === 'new') {
      this.titleService.setPageTitle('Create Rule Trigger');
      this.loading.hide();
      return;
    }
    console.log('Editing Rule Trigger...');
    switch (this.ruleTriggerType) {
      case 'Schedule (Recurring)':
        this.router.navigate([`/rule-trigger/schedule-trigger/${this.ruleTriggerId}`]);
        break;
      case 'Schedule (One-Time)':
        this.router.navigate([`/rule-trigger/one-time-trigger/${this.ruleTriggerId}`]);
        break;
      case 'Task':
        this.router.navigate([`/rule-trigger/task-trigger/${this.ruleTriggerId}`]);
        break;
      case 'Noun':
        this.router.navigate([`/rule-trigger/noun-trigger/${this.ruleTriggerId}`]);
        break;
      default:
        this.loading.hide();
        return;
    }
  }
}
