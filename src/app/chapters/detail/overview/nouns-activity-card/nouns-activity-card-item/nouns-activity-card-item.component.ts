import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'nouns-activity-card-item',
  templateUrl: './nouns-activity-card-item.component.html',
  styleUrls: ['./nouns-activity-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounsActivityCardItemComponent {
  @Input()
  public item: InventoryItem;

  @Input()
  public index: number;

  @Input()
  public length: number;
}
