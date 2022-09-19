import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {throttleTime} from 'rxjs/operators';
import {AdjectiveForm} from './../../../../../core/model/adjective-form';
import {ADJECTIVE_TYPES, DATE_TYPE_OPTIONS, NUMBER_TYPE_OPTIONS} from '../../shared/adjective-types';

@Component({
  selector: 'new-adjective-form',
  templateUrl: './new-adjective-form.component.html',
  styleUrls: ['./new-adjective-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAdjectiveFormComponent implements OnInit, OnChanges {
  @Input()
  public formValue: AdjectiveForm;

  @Input()
  public new: boolean;

  @Output()
  public valueChange = new EventEmitter<AdjectiveForm>();

  public readonly adjectiveTypes: string[] = ADJECTIVE_TYPES;
  public readonly numberTypeOptions: string[] = NUMBER_TYPE_OPTIONS;
  public readonly dateTypeOptions: string[] = DATE_TYPE_OPTIONS;

  public form = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    options: new FormControl([]),
    numeric: new FormControl(),
    numberTypeOption: new FormControl(this.numberTypeOptions[0]),
    dateTypeOption: new FormControl(''),
  });

  public options$ = new BehaviorSubject<string[]>([]);
  public optionLabel$ = new BehaviorSubject<string>('');

  private subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscriptions.add(this.subscribeToFormChanges());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formValue && this.formValue) {
      this.fillInForm();
    }
  }

  private subscribeToFormChanges(): Subscription {
    return this.form.valueChanges.pipe(throttleTime(10)).subscribe(formValue => {
      this.valueChange.emit(formValue);
    });
  }

  public fillInForm() {
    this.form.setValue({
      name: this.formValue.name || '',
      type: this.formValue.type || '',
      options: this.formValue.options || [],
      numeric: this.formValue.numeric || false,
      numberTypeOption: this.formValue.numberTypeOption || this.numberTypeOptions[0],
      dateTypeOption: this.formValue.dateTypeOption || 'any date',
    });
  }

  public onNameChange(name: string) {
    this.form.patchValue({name});
  }

  public onTypeChange(type: string) {
    this.form.patchValue({type, numeric: type === 'number'});
    this.optionLabel$.next(this.findOption(type));
  }

  public onNumberTypeChange(numberTypeOption: string) {
    this.form.patchValue({numberTypeOption});
  }

  public onChipListChange(options: string[]) {
    this.options$.next(options);
    this.form.patchValue({options});
  }

  private findOption(type: string): string {
    switch (type) {
      case 'number':
        return 'units of measure';
      default:
        return 'options';
    }
  }

  public onDateTypeChange(dateTypeOption: string) {
    this.form.patchValue({dateTypeOption});
  }
}
