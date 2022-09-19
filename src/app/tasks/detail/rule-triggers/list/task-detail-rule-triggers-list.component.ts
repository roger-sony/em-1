import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {TaskRuleTrigger} from 'src/app/core/model/task-rule-trigger';

@Component({
  selector: 'task-detail-rule-triggers-list',
  templateUrl: './task-detail-rule-triggers-list.component.html',
  styleUrls: ['./task-detail-rule-triggers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailRuleTriggersListComponent {
  @Input()
  public ruleTriggers: TaskRuleTrigger[];

  @Input()
  public plansMap: Record<string, DecisionTable>;

  @Output()
  public edit = new EventEmitter<number>();

  @Output()
  public delete = new EventEmitter<number>();

  public hoveredIndex: number;
}
