import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Chapter} from '../../../../../core/model/chapter';
import {Task} from '../../../../../core/model/task';

@Component({
  selector: 'task-card-content',
  templateUrl: './task-card-content.component.html',
  styleUrls: ['./task-card-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardContentComponent implements OnInit {
  @Input()
  public chaptersMap: Record<string, Chapter>;

  @Input()
  public task: Task;

  constructor() {}

  ngOnInit(): void {}
}
