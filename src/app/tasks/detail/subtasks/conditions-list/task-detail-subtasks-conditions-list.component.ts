import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FactFilter} from 'src/app/core/model/fact-filter';

@Component({
  selector: 'task-detail-subtasks-conditions-list',
  templateUrl: './task-detail-subtasks-conditions-list.component.html',
  styleUrls: ['./task-detail-subtasks-conditions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailSubtasksConditionsListComponent {
  @Input()
  public facts: FactFilter[];

  @Output()
  public edit = new EventEmitter();

  @Output()
  public delete = new EventEmitter();

  public hoveredIndex: number;
}
