import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {CadenceDisplay} from '../../../../core/model/cadence-display';
import {DecisionTable} from '../../../../core/model/decision-table';
import {NounRuleTrigger} from '../../../../core/model/noun-rule-trigger';
import {RuleSchedule} from '../../../../core/model/rule-schedule';
import {TaskRuleTrigger} from '../../../../core/model/task-rule-trigger';
import {formatRuleSchedule} from '../../../../shared/utils/plans/format-rule-schedule';
import {Chapter} from '../../../../core/model/chapter';

@Component({
  selector: 'plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardComponent implements OnChanges {
  @Input()
  plan: DecisionTable;

  @Input()
  activePlan: DecisionTable;

  @Input()
  taskTriggers: TaskRuleTrigger[];

  @Input()
  nounTriggers: NounRuleTrigger[];

  @Input()
  ruleSchedules: RuleSchedule[];

  @Input()
  selected: boolean;

  @Input()
  unitOfMeasures: UnitOfMeasure[];

  @Input()
  tasks: Task[];

  @Input()
  public chapters: Chapter[];

  triggerCount: number = 0;

  cadenceArray: CadenceDisplay[] = [];

  classSelection: string = 'card';

  constructor(private element: ElementRef, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.plan || changes.ruleSchedules) && this.plan && this.ruleSchedules) {
      this.ruleScheduleDisplay();
    }
    if (changes.plan && this.plan && changes.taskTriggers && this.taskTriggers) {
      this.taskTriggerCount();
    }
    if (changes.activePlan && this.activePlan) {
      if (this.activePlan?.id === this.plan?.id) {
        setTimeout(() => this.element?.nativeElement?.scrollIntoView({behavior: 'smooth'}));
      }
      this.checkClass();
    }
  }

  cardClick(): void {
    this.router.navigate(['/', 'plans', this.plan.id]);
  }

  checkClass(): void {
    this.classSelection = this.plan.id === this.activePlan.id ? 'plan-card-selected card' : 'card';
  }

  ruleScheduleDisplay(): void {
    const ruleSchedules = this.ruleSchedules.filter(r => r.ruleId === this.plan.id);

    if (ruleSchedules.length === 0) {
      const cadence: CadenceDisplay = {
        type: 'plan-cadence-none',
        display: 'No Cadence',
      };
      this.cadenceArray = [cadence];
      return;
    }

    this.cadenceArray = ruleSchedules.reduce((cadences, ruleSchedule) => {
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

  taskTriggerCount(): void {
    this.nounTriggers.forEach(n => {
      if (n.ruleId === this.plan.id) {
        this.triggerCount += 1;
      }
    });
    this.taskTriggers.forEach(t => {
      if (t.ruleId === this.plan.id) {
        this.triggerCount += 1;
      }
    });
  }
}
