import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as moment from 'moment';
import {Moment, MomentInput} from 'moment';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ListPickerConfig} from '../list-picker/list-picker-config';
import {createTimePickerOptions} from './util/create-time-picker-options';
import {roundTimePickerMinutes} from './util/round-time-picker-minutes';

@Component({
  selector: 'mobile-time-picker',
  templateUrl: './mobile-time-picker.component.html',
  styleUrls: ['./mobile-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MobileTimePickerComponent),
    },
  ],
})
export class MobileTimePickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  public value: MomentInput;

  @Output()
  public valueChange = new EventEmitter<Moment>();

  public readonly hourOptions = createTimePickerOptions('hour');
  public readonly minuteOptions = createTimePickerOptions('minute');

  public readonly pickerConfig: ListPickerConfig = {
    itemPadding: '0 5px',
    itemTextAlign: 'center',
  };

  public value$ = new BehaviorSubject<Moment>(null);

  public hour$: Observable<string>;
  public minute$: Observable<string>;
  public period$: Observable<string>;

  public ngOnInit() {
    this.hour$ = this.value$.pipe(map(value => value?.format('hh')));
    this.minute$ = this.value$.pipe(map(value => value?.format('mm')));
    this.period$ = this.value$.pipe(map(value => value?.format('a') || 'am'));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      const roundedValue = roundTimePickerMinutes(this.value);
      this.value$.next(roundedValue);
    }
  }

  public onHourChange(hour: string) {
    combineLatest([this.minute$, this.period$])
      .pipe(take(1))
      .subscribe(([minute, period]) => this.updateValue(hour, minute, period));
  }

  public onMinuteChange(minute: string) {
    combineLatest([this.hour$, this.period$])
      .pipe(take(1))
      .subscribe(([hour, period]) => this.updateValue(hour, minute, period));
  }

  public onPeriodChange(period: string) {
    combineLatest([this.hour$, this.minute$])
      .pipe(take(1))
      .subscribe(([hour, minute]) => this.updateValue(hour, minute, period));
  }

  private updateValue(hour: string, minute: string, period: string) {
    const formattedTime = `${hour || 0}:${minute || 0} ${period || 'am'}`;
    const value = moment(formattedTime, 'hh:mm a');

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

  public setDisabledState(disabled: boolean): void {}

  public writeValue(value: Moment): void {
    const roundedValue = roundTimePickerMinutes(value);
    this.value$.next(roundedValue);
  }
}
