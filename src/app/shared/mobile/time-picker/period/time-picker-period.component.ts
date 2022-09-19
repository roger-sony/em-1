import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'time-picker-period',
  templateUrl: './time-picker-period.component.html',
  styleUrls: ['./time-picker-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerPeriodComponent {
  @Input()
  public value: 'am' | 'pm' | string;

  @Output()
  public valueChange = new EventEmitter<string>();

  public onOptionClick(value: string) {
    this.valueChange.emit(value);
  }
}
