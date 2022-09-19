import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'chapter-tasks-empty',
  templateUrl: './chapter-tasks-empty.component.html',
  styleUrls: ['./chapter-tasks-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterTasksEmptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
