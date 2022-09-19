import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Chapter} from '../../../../core/model/chapter';

@Component({
  selector: 'chapter-detail-navigation',
  templateUrl: './chapter-detail-navigation.component.html',
  styleUrls: ['./chapter-detail-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterDetailNavigationComponent {
  @Input()
  public chapter: Chapter;
}
