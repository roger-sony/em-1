import {Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter} from '@angular/core';
import {FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, tap, startWith} from 'rxjs/operators';
import {trimString} from '../utils/trim-string';

/* tslint:disable:no-any */
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: AutocompleteComponent, multi: true}],
})
export class AutocompleteComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  set inputValue(val: string) {
    this.myControl.setValue(val);
  }

  @Input() options: any[];
  @Input() placeholder: string = 'Text Value';
  @Input() currentValue: string;
  @Input() fieldRequired: boolean;
  @Input() fieldDisabled: boolean;
  @Input() wide: boolean = false;
  @Input() label: string;
  @Input() inputError: boolean = false;
  @Input() index: number;

  @Output()
  public valueChange = new EventEmitter<string>();

  autocompleteData: any;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      tap(value => {
        this._select(value);
        this.valueChange.emit(this.myControl.value);
        return trimString(value);
      }),
      startWith(this.myControl.value), // Allow filteredOptions to appear before user types anything.
      map(value => this._filter(value))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // NOTE: Hack to force re-render when options change in dTable, task forms
    if (changes.options) {
      const prev = changes.options.previousValue as any[];
      const curr = changes.options.currentValue;
      if (prev && curr) {
        if (prev.length !== curr.length) {
          this.myControl.setValue('');
          return;
        }
        const equal = prev.every((item, index) => item === curr[index]);
        if (!equal) {
          this.myControl.setValue('');
        }
      }
    }
  }

  private _filter(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options?.filter(option => option.toLowerCase().includes(filterValue)) || [];
    }
    return this.options || [];
  }

  private _select(value: string): void {
    this.onChange(value);
  }

  // public onChange (value: string) => void;
  public onChange(value: string): void {
    return;
  }

  getWidth(): string {
    return this.wide ? '500px' : '201px';
  }

  resetInput(): void {
    this.myControl.setValue('');
  }

  /*******************************************************************************
                    Methods for ControlValueAccessor Interface
*******************************************************************************/
  writeValue(value: string) {
    this.currentValue = value;
  }

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() {} // Required by framework even if empty

  onBlur(): void {
    if (!this.myControl.value) {
      return;
    }
    this.myControl.setValue(trimString(this.myControl.value));

    this.valueChange.emit(this.myControl.value);
  }
}
