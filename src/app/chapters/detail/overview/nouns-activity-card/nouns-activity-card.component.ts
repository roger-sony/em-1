import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'nouns-activity-card',
  templateUrl: './nouns-activity-card.component.html',
  styleUrls: ['./nouns-activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounsActivityCardComponent {
  @Input()
  public activity: InventoryItem[];

  public trackById(index: number, activity: InventoryItem) {
    return activity.id;
  }
}
