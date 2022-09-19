import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';

@Component({
  selector: 'chapter-card',
  templateUrl: './chapter-card.component.html',
  styleUrls: ['./chapter-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterCardComponent {
  @Input()
  public chapter: Chapter;

  @Input()
  public overview: boolean;
}
