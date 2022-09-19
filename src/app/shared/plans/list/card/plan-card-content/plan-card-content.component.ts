import {Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges} from '@angular/core';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {CadenceDisplay} from 'src/app/core/model/cadence-display';
import * as moment from 'moment';
import {formatRuleSchedule} from 'src/app/shared/utils/plans/format-rule-schedule';
import {Chapter} from '../../../../../core/model/chapter';

@Component({
  selector: 'plan-card-content',
  templateUrl: './plan-card-content.component.html',
  styleUrls: ['./plan-card-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardContentComponent implements OnChanges {
  @Input()
  public chapters: Chapter[];

  @Input()
  public plan: DecisionTable;

  public cadences: CadenceDisplay[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plan && this.plan) {
      this.ruleScheduleDisplay();
    }
  }

  ruleScheduleDisplay(): void {
    const ruleSchedules = this.plan.cadences.filter(r => r.ruleId === this.plan.id);

    if (ruleSchedules.length === 0) {
      const cadence: CadenceDisplay = {
        type: 'plan-cadence-none',
        display: 'No Cadence',
      };
      this.cadences = [cadence];
      return;
    }

    this.cadences = ruleSchedules.reduce((cadences, ruleSchedule) => {
      const cadence: CadenceDisplay = {
        type: '',
        display: '',
      };

      if (!ruleSchedule.schedule) {
        cadence.type = 'plan-cadence-onetime';
        cadence.display = moment(ruleSchedule.startDate).format('LL');
      } else if (ruleSchedule.schedule.slice(-1) === 'Z') {
        cadence.type = 'plan-cadence-onetime';
        cadence.display = moment(ruleSchedule.schedule).format('LL');
      } else {
        cadence.type = 'plan-cadence-recurring';
        cadence.display = formatRuleSchedule(ruleSchedule);
      }
      cadences.push(cadence);
      return cadences;
    }, []);
  }
}
