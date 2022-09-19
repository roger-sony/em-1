import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SearchItem} from '../search-item';

@Component({
  selector: 'mobile-search-page-item',
  templateUrl: './mobile-search-page-item.component.html',
  styleUrls: ['./mobile-search-page-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSearchPageItemComponent {
  @Input()
  public item: SearchItem;
}
