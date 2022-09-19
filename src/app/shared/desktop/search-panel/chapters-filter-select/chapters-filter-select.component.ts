import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Chapter} from '../../../../core/model/chapter';

@Component({
  selector: 'chapters-filter-select',
  templateUrl: './chapters-filter-select.component.html',
  styleUrls: ['./chapters-filter-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersFilterSelectComponent {
  @Input()
  public chapters: Chapter[];

  @Input()
  public defaultChapterId: string;

  @Input()
  public value: string[];

  @Output()
  public valueChange = new EventEmitter<string[]>();

  public onValueChange(value: string[]) {
    this.valueChange.emit(value);
  }

  public trackByChapterId(index: number, chapter: Chapter) {
    return chapter.id;
  }
}
