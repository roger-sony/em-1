import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ChapterTask} from 'src/app/core/model/chapter-task';

@Component({
  selector: 'tasks-activity-card',
  templateUrl: './tasks-activity-card.component.html',
  styleUrls: ['./tasks-activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksActivityCardComponent {
  @Input()
  public tasks: ChapterTask[];

  @Input()
  public activityFilter: string;

  public tasksDisplay: string;
}
