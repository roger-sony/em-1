import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'nouns-list',
  templateUrl: './nouns-list.component.html',
  styleUrls: ['./nouns-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounsListComponent {
  @Input()
  public chapterId: string;

  @Input()
  public chaptersMap: Record<string, Chapter>;

  @Input()
  public nouns: InventoryItem[];

  @Input()
  public selectedTaskId: string;

  @Output()
  public selectedTaskIdChange = new EventEmitter<string>();

  public onCardClick(noun: InventoryItem) {
    this.selectedTaskIdChange.emit(noun.id);
  }

  public trackByNoun(index: number, noun: InventoryItem): string {
    return noun.id;
  }
}
