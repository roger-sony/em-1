import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from 'src/app/core/model/task';
import {Chapter} from '../../../core/model/chapter';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input()
  public chapterId: string;

  @Input()
  public chaptersMap: Record<string, Chapter>;

  @Input()
  public tasks: Task[];

  @Input()
  public selectedTaskId: string;

  @Output()
  public selectedTaskIdChange = new EventEmitter<string>();

  public onCardClick(task: Task) {
    this.selectedTaskIdChange.emit(task.id);
  }

  public trackByTask(index: number, task: Task): string {
    return task.id;
  }
}
