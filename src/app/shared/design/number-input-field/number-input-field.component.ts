import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {OphInputDirective} from '../oph-input/oph-input.directive';

@Component({
  selector: 'number-input-field',
  templateUrl: './number-input-field.component.html',
  styleUrls: ['./number-input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NumberInputFieldComponent),
    },
  ],
})
export class NumberInputFieldComponent implements ControlValueAccessor {
  @Input()
  public disabled: boolean;

  @Input()
  public error: string;

  @Input()
  public label: string;

  @Input()
  public min: number;

  @Input()
  public max: number;

  @Input()
  public placeholder: string;

  @Input()
  public value: number;

  @Output()
  public valueChange = new EventEmitter<number>();

  @HostBinding('class.number-input-field')
  public rootClass = true;

  @ViewChild(OphInputDirective)
  public input: OphInputDirective;

  public onIconClick(event: MouseEvent) {
    const input = this.input.element.nativeElement as HTMLInputElement;
    if (event.offsetY < 12) {
      input.stepUp(1);
    } else {
      input.stepDown(1);
    }

    this.updateValue(input.value);
  }

  public onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateValue(input.value);
  }

  private updateValue(stringValue: string) {
    const value = Number(stringValue);

    this.valueChange.emit(value);
    this.updateControlValue(value);
    this.onTouched(value);
  }

  private updateControlValue: (value: number) => void = () => {};

  public registerOnChange(onChange: () => void): void {
    this.updateControlValue = onChange;
  }

  private onTouched: (value: number) => void = () => {};

  public registerOnTouched(onTouched: () => void): void {}

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public writeValue(value: number): void {
    this.value = value;
  }
}
