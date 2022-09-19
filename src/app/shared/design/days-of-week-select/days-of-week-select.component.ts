import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'days-of-week-select',
  templateUrl: './days-of-week-select.component.html',
  styleUrls: ['./days-of-week-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DaysOfWeekSelectComponent),
    },
  ],
})
export class DaysOfWeekSelectComponent implements OnChanges, ControlValueAccessor {
  @Input()
  public value: number[];

  @Output()
  public valueChange = new EventEmitter<number[]>();

  public readonly dayIndexes = new Array(7).fill(0).map((value, index) => index);
  public readonly dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  public value$ = new BehaviorSubject<number[]>([]);

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.value$.next(this.value);
    }
  }

  public onDayButtonClick(dayIndex: number) {
    const value = this.value$.getValue() || [];
    if (value.includes(dayIndex)) {
      this.updateValue(value.filter(index => index !== dayIndex));
    } else {
      this.updateValue(value.concat(dayIndex).sort());
    }
  }

  private updateValue(value: number[]) {
    this.value$.next(value);
    this.valueChange.emit(value);
    this.updateControlValue(value);
  }

  private updateControlValue: (value: number[]) => void = () => {};

  public registerOnChange(onChange: () => void): void {
    this.updateControlValue = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {}

  public setDisabledState(disabled: boolean): void {}

  public writeValue(value: number[]): void {
    this.value$.next(value);
  }
}
