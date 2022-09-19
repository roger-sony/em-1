import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';

@Component({
  selector: 'chapter-detail-card',
  templateUrl: './chapter-detail-card.component.html',
  styleUrls: ['./chapter-detail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterDetailCardComponent {
  @Input()
  public chapter: Chapter;
}
