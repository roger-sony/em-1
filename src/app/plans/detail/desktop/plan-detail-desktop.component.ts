import {InventoryItem} from 'src/app/core/model/inventory-item';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DecisionTable} from '../../../core/model/decision-table';
import {NounRuleTrigger} from '../../../core/model/noun-rule-trigger';
import {RuleSchedule} from '../../../core/model/rule-schedule';
import {Task} from '../../../core/model/task';
import {TaskRuleTrigger} from '../../../core/model/task-rule-trigger';
import {UnitOfMeasure} from '../../../core/model/unit-of-measure';
import {Chapter} from '../../../core/model/chapter';

@Component({
  selector: 'plan-detail-desktop',
  templateUrl: './plan-detail-desktop.component.html',
  styleUrls: ['./plan-detail-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailDesktopComponent {
  @Input()
  productionEnvironment: boolean;

  @Input()
  filteredPlans: DecisionTable[];

  @Input()
  public nounsSearch: string;

  @Input()
  activePlan: DecisionTable;

  @Input()
  nounRuleTriggers: NounRuleTrigger;

  @Input()
  taskRuleTriggers: TaskRuleTrigger;

  @Input()
  ruleSchedules: RuleSchedule[];

  @Input()
  unitOfMeasures: UnitOfMeasure;

  @Input()
  public unitOfMeasuresMap: Record<string, UnitOfMeasure>;

  @Input()
  tasks: Task[];

  @Input()
  nouns: InventoryItem[];

  @Input()
  loadingPlans: boolean;

  @Input()
  loadingNounRuleTriggers: boolean;

  @Input()
  loadingTaskRuleTriggers: boolean;

  @Input()
  loadingRuleSchedules: boolean;

  @Input()
  loadingUnitOfMeasures: boolean;

  @Input()
  loadingTasks: boolean;

  @Input()
  public chapters: Chapter[];

  panelOpen: boolean = true;

  panelState(): void {
    this.panelOpen = !this.panelOpen;
  }
}
