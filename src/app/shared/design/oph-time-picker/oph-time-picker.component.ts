import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import * as moment from 'moment';
import {Moment} from 'moment';
import {BehaviorSubject} from 'rxjs';
import {OphInputDirective} from '../oph-input/oph-input.directive';
import {createTimePickerOptions} from './create-time-picker-options';

@Component({
  selector: 'oph-time-picker',
  templateUrl: './oph-time-picker.component.html',
  styleUrls: ['./oph-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OphTimePickerComponent),
    },
  ],
})
export class OphTimePickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  public disabled: boolean;

  @Input()
  public format = 'hh:mm A';

  @Input()
  public placeholder = 'Choose time';

  @Input()
  public value: Moment;

  @Input()
  public midnightOption: boolean;

  @Output()
  public valueChange = new EventEmitter<Moment>();

  @ViewChild(MatAutocompleteTrigger)
  public autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild(OphInputDirective)
  public input: OphInputDirective;

  @ViewChild(MatAutocomplete)
  public matAutocomplete: MatAutocomplete;

  @HostBinding('class.oph-time-picker')
  public rootClass = true;

  public options = createTimePickerOptions();

  public value$ = new BehaviorSubject<Moment>(null);

  public ngOnInit() {
    if (this.midnightOption) {
      this.options.push('11:59 PM');
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.value$.next(this.value);
    }
  }

  public onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = moment(input.value, this.format);
    this.updateValue(value);
  }

  public onButtonClick(event: MouseEvent) {
    event.stopPropagation();
    this.input.element.nativeElement.focus();
    this.autocompleteTrigger.openPanel();
    const timeIndex = this.options.findIndex(option => option === this.value$.value?.format(this.format));
    if (timeIndex === -1) {
      return;
    }
    setTimeout(() => (this.matAutocomplete.panel.nativeElement.scrollTop = 40 * timeIndex));
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const value = moment(event.option.value, this.format);
    this.updateValue(value);
  }

  public trackByOption(index: number, option: string): string {
    return option;
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
