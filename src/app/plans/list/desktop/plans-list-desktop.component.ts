import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {TaskRuleTrigger} from '../../../core/model/task-rule-trigger';
import {RuleSchedule} from '../../../core/model/rule-schedule';
import {DecisionTable} from '../../../core/model/decision-table';
import {NounRuleTrigger} from '../../../core/model/noun-rule-trigger';
import {Task} from '../../../core/model/task';
import {UnitOfMeasure} from '../../../core/model/unit-of-measure';
import {Chapter} from '../../../core/model/chapter';

@Component({
  selector: 'plans-list-desktop',
  templateUrl: './plans-list-desktop.component.html',
  styleUrls: ['./plans-list-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansListDesktopComponent {
  @Input()
  loadingPlans: boolean;

  @Input()
  loadingNounRuleTriggers: boolean;

  @Input()
  loadingTaskRuleTriggers: boolean;

  @Input()
  loadingRuleSchedules: boolean;

  @Input()
  plans: DecisionTable[];

  @Input()
  nounRuleTriggers: NounRuleTrigger[];

  @Input()
  taskRuleTriggers: TaskRuleTrigger[];

  @Input()
  ruleSchedules: RuleSchedule[];

  @Input()
  filteredPlans: DecisionTable[];

  @Input()
  tasks: Task[];

  @Input()
  unitOfMeasures: UnitOfMeasure[];

  @Input()
  public chapters: Chapter[];

  emptyCards: number[];

  constructor() {
    this.emptyCards = Array(20).fill(0);
  }

  trackByItems(index: number, plan: DecisionTable): string {
    return plan.id;
  }
}
