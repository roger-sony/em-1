import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'noun-card',
  templateUrl: './noun-card.component.html',
  styleUrls: ['./noun-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounCardComponent {
  @Input()
  public chapterId: string;

  @Input()
  public chaptersMap: Record<string, Chapter>;

  @Input()
  public selected: boolean;

  @Input()
  public noun: InventoryItem;
}
