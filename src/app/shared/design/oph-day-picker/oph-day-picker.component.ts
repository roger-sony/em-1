import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'oph-day-picker',
  templateUrl: './oph-day-picker.component.html',
  styleUrls: ['./oph-day-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphDayPickerComponent {
  @Output()
  public valueChange = new EventEmitter<number>();

  @Input()
  public value: string;

  @Input()
  public options: string[];

  public onValueChange(day: string) {
    this.valueChange.emit(this.options.indexOf(day));
  }
}
