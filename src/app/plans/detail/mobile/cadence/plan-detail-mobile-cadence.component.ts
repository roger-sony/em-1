import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RuleSchedule} from 'src/app/core/model/rule-schedule';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {Router, ActivatedRoute} from '@angular/router';
import {convertRuleScheduleToCadenceForm} from 'src/app/shared/utils/plans/convert-rule-schedule-to-cadence-form';
import {CadenceForm} from 'src/app/core/model/form/cadence-form';

@Component({
  selector: 'plan-detail-mobile-cadence',
  templateUrl: './plan-detail-mobile-cadence.component.html',
  styleUrls: ['./plan-detail-mobile-cadence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailMobileCadenceComponent implements OnInit, OnChanges {
  @Input()
  public ruleSchedule: RuleSchedule;

  @Input()
  public plan: DecisionTable;

  public cadenceForm: CadenceForm;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  public onCadenceClick() {
    this.router.navigate([`./cadence/${this.ruleSchedule.id}`], {relativeTo: this.activatedRoute});
  }

  private convertRuleSchedule() {
    this.cadenceForm = convertRuleScheduleToCadenceForm(this.ruleSchedule);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ruleSchedule && this.ruleSchedule) {
      this.convertRuleSchedule();
    }
  }
}
