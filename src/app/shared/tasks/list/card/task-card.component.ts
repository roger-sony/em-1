import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Chapter} from '../../../../core/model/chapter';
import {Task} from '../../../../core/model/task';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  @Input()
  public chapterId: string;

  @Input()
  public chaptersMap: Record<string, Chapter>;

  @Input()
  public selected: boolean;

  @Input()
  public task: Task;
}
