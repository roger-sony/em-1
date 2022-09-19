import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'noun-card-content',
  templateUrl: './noun-card-content.component.html',
  styleUrls: ['./noun-card-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounCardContentComponent {
  @Input()
  public chaptersMap: Record<string, Chapter>;

  @Input()
  public noun: InventoryItem;
}
