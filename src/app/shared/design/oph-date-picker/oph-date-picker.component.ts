import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Moment} from 'moment';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'oph-date-picker',
  templateUrl: './oph-date-picker.component.html',
  styleUrls: ['./oph-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OphDatePickerComponent),
    },
  ],
})
export class OphDatePickerComponent implements OnChanges, ControlValueAccessor {
  @Input()
  public disabled: boolean;

  @Input()
  public minValue: Moment;

  @Input()
  public maxValue: Moment;

  @Input()
  public placeholder = 'Choose a date';

  @Input()
  public value: Moment;

  @Output()
  public valueChange = new EventEmitter<Moment>();

  @ViewChild(MatDatepicker)
  public matDatePicker: MatDatepicker<Moment>;

  @HostBinding('class.oph-date-picker')
  public rootClass = true;

  public value$ = new BehaviorSubject<Moment>(null);

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.value$.next(this.value);
    }
  }

  public onTriggerClick() {
    if (this.disabled) {
      return;
    }

    if (this.matDatePicker.opened) {
      this.matDatePicker.close();
    } else {
      this.matDatePicker.open();
    }
  }

  public onDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.updateValue(event.value);
  }

  private updateValue(value: Moment) {
    this.value$.next(value);
    this.updateControlValue(value);
    this.updateControlTouched();
    this.valueChange.emit(value);
  }

  private updateControlValue: (value: Moment) => void = () => {};

  public registerOnChange(onChange: () => void): void {
    this.updateControlValue = onChange;
  }

  private updateControlTouched: () => void = () => {};

  public registerOnTouched(onTouched: () => void): void {
    this.updateControlTouched = onTouched;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public writeValue(value: Moment): void {
    this.value$.next(value);
  }
}
