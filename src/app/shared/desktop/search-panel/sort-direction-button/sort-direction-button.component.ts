import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'sort-direction-button',
  templateUrl: './sort-direction-button.component.html',
  styleUrls: ['./sort-direction-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortDirectionButtonComponent {
  @Input()
  public value: string;

  @Output()
  public valueChange = new EventEmitter<string>();

  public onButtonClick() {
    this.valueChange.emit(this.value === 'desc' ? 'asc' : 'desc');
  }
}
