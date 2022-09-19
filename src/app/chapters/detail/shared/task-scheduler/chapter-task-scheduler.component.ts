import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'chapter-task-scheduler',
  templateUrl: './chapter-task-scheduler.component.html',
  styleUrls: ['./chapter-task-scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterTaskSchedulerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
