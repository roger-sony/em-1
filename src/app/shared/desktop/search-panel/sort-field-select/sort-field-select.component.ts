import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SortOption} from '../../../../core/model/search/sort-option';

@Component({
  selector: 'sort-field-select',
  templateUrl: './sort-field-select.component.html',
  styleUrls: ['./sort-field-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortFieldSelectComponent {
  @Input()
  public options: SortOption[];

  @Input()
  public minWidth: string;

  @Input()
  public value: string;

  @Input()
  public hideIcons: boolean;

  @Input()
  public darkBackground: boolean;

  @Output()
  public valueChange = new EventEmitter<string>();

  public onValueChange(value: string) {
    this.valueChange.emit(value);
  }

  public trackByOptionField(index: number, option: SortOption) {
    return option.field;
  }
}
