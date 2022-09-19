import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild, ElementRef} from '@angular/core';
import {TaskRuleTrigger} from '../../../../../core/model/task-rule-trigger';
import {RuleSchedule} from '../../../../../core/model/rule-schedule';
import {DecisionTable} from '../../../../../core/model/decision-table';
import {NounRuleTrigger} from '../../../../../core/model/noun-rule-trigger';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {Task} from 'src/app/core/model/task';
import {Chapter} from '../../../../../core/model/chapter';

@Component({
  selector: 'plans-panel-content',
  templateUrl: './plans-panel-content.component.html',
  styleUrls: ['./plans-panel-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansPanelContentComponent {
  @Input()
  filteredPlans: DecisionTable[];

  @Input()
  activePlan: DecisionTable;

  @Input()
  nounRuleTriggers: NounRuleTrigger[];

  @Input()
  taskRuleTriggers: TaskRuleTrigger[];

  @Input()
  ruleSchedules: RuleSchedule[];

  @Input()
  unitOfMeasures: UnitOfMeasure;

  @Input()
  tasks: Task[];

  @Input()
  loadingPlans: boolean;

  @Input()
  public chapters: Chapter[];

  @Output() changePanelStateMain = new EventEmitter();

  @ViewChild('selected') public selected: ElementRef;

  emptyCards = Array(20).fill(0);

  trackById(index: number, f: DecisionTable): string {
    return f.id;
  }
}
