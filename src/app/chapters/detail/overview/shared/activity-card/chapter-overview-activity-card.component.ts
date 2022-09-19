import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'chapter-overview-activity-card',
  templateUrl: './chapter-overview-activity-card.component.html',
  styleUrls: ['./chapter-overview-activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterOverviewActivityCardComponent {
  @Input()
  public iconName: string;

  @Input()
  public text: string;
}
