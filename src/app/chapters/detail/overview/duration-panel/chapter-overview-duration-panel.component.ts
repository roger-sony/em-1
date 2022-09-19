import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';

@Component({
  selector: 'chapter-overview-duration-panel',
  templateUrl: './chapter-overview-duration-panel.component.html',
  styleUrls: ['./chapter-overview-duration-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterOverviewDurationPanelComponent implements OnInit {
  @Input()
  public chapter: Chapter;

  constructor() {}

  ngOnInit(): void {}
}
