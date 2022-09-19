import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Chapter} from '../../../../core/model/chapter';

@Component({
  selector: 'chapter-chip',
  templateUrl: './chapter-chip.component.html',
  styleUrls: ['./chapter-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterChipComponent {
  @Input()
  public chapter: Chapter;

  @Input()
  public readonly: boolean;

  @Output()
  public remove = new EventEmitter();

  public onRemoveClick(event: MouseEvent) {
    event.stopPropagation();
    this.remove.emit();
  }
}
