import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {CadenceEndForm, CadenceForm, CustomCadenceForm} from '../../../../core/model/form/cadence-form';
import {CadenceFormControl} from './cadence-form-control';
import {cadenceFormValidator} from './cadence-form.validator';
import {CadenceRepetition, TaskCadenceRepetition} from './cadence-repetition';
import {CadenceIntervalType} from '../../../../core/model/form/cadence-interval-type';
import {CadenceMonthlyType} from '../../../../core/model/form/cadence-monthly-type';
import {CustomCadenceFormControl} from './custom/custom-cadence-form-control';
import {CadenceEndFormControl} from './end/cadence-end-form-control';
import {CadenceEndType} from '../../../../core/model/form/cadence-end-type';

export const DATE_PICKER_FORMATS = {
  parse: {
    dateInput: 'ddd, MMM Do YYYY',
  },
  display: {
    dateInput: 'ddd, MMM Do YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'cadence-form',
  templateUrl: './cadence-form.component.html',
  styleUrls: ['./cadence-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMATS}],
})
export class CadenceFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public required: boolean;

  @Input()
  public value: CadenceForm;

  @Input()
  public task: boolean;

  @Input()
  public disableEndRepeatOptions: boolean;

  @Output()
  public valueChange = new EventEmitter<CadenceForm>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  @Output()
  public add = new EventEmitter();

  @Output()
  public reset = new EventEmitter();

  public readonly form = new FormGroup({
    [CadenceFormControl.Date]: new FormControl(),
    [CadenceFormControl.Time]: new FormControl(),
    [CadenceFormControl.Repetition]: new FormControl(CadenceRepetition.DoNotRepeat),
    [CadenceFormControl.Custom]: new FormGroup({
      [CustomCadenceFormControl.IntervalNumber]: new FormControl(1),
      [CustomCadenceFormControl.IntervalType]: new FormControl(CadenceIntervalType.Week),
      [CustomCadenceFormControl.MonthlyType]: new FormControl(CadenceMonthlyType.DayOfMonth),
      [CustomCadenceFormControl.WeeklyDays]: new FormControl([]),
    }),
    [CadenceFormControl.End]: new FormGroup({
      [CadenceEndFormControl.EndType]: new FormControl(CadenceEndType.Never),
      [CadenceEndFormControl.EndDate]: new FormControl(null),
      [CadenceEndFormControl.MaxSkedsNumber]: new FormControl(1),
    }),
  });

  public readonly controls = CadenceFormControl;
  public readonly repetitions = Object.values(CadenceRepetition);
  public readonly taskRepetitions = Object.values(TaskCadenceRepetition);

  public readonly tomorrow = moment().add(1, 'day').startOf('day');
  public readonly today = moment().startOf('day');

  public timeShown$: Observable<boolean>;
  public repetitionShown$: Observable<boolean>;
  public customShown$: Observable<boolean>;
  public endShown$: Observable<boolean>;

  public date$: Observable<Moment>;

  private subscriptions = new Subscription();

  public ngOnInit(): void {
    this.date$ = this.observeDate();
    this.timeShown$ = this.date$.pipe(map(dateValue => !!dateValue));
    this.repetitionShown$ = this.observeRepetitionShown(this.timeShown$);
    this.customShown$ = this.observeCustomShown(this.repetitionShown$);
    this.endShown$ = this.observeEndShown(this.repetitionShown$);

    this.subscriptions.add(this.subscribeToFormChanges());
    this.validityChange.emit(this.form.valid);
  }

  private observeDate() {
    return this.dateControl.valueChanges.pipe(startWith(this.dateControl.value));
  }

  private observeRepetitionShown(timeShown$: Observable<boolean>): Observable<boolean> {
    return combineLatest([timeShown$, this.timeControl.valueChanges.pipe(startWith(this.timeControl.value))]).pipe(
      map(([timeShown, timeValue]) => Boolean(timeShown && timeValue))
    );
  }

  private observeCustomShown(repetitionShown$: Observable<boolean>): Observable<boolean> {
    return combineLatest([
      repetitionShown$,
      this.repetitionControl.valueChanges.pipe(startWith(this.repetitionControl.value)),
    ]).pipe(
      map(([repetitionShown, repetitionValue]) => repetitionShown && repetitionValue === CadenceRepetition.Custom)
    );
  }

  private observeEndShown(repetitionShown$: Observable<boolean>): Observable<boolean> {
    return combineLatest([
      repetitionShown$,
      this.repetitionControl.valueChanges.pipe(startWith(this.repetitionControl.value)),
    ]).pipe(
      map(([repetitionShown, repetitionValue]) => repetitionShown && repetitionValue !== CadenceRepetition.DoNotRepeat)
    );
  }

  private subscribeToFormChanges(): Subscription {
    return this.form.valueChanges
      .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(formValue => {
        const date = formValue[CadenceFormControl.Date];
        const time = formValue[CadenceFormControl.Time];
        const repetition = formValue[CadenceFormControl.Repetition];
        const startDateTime = date && moment(date);

        if (time) {
          startDateTime?.hour(time.hour()).minute(time.minute());
        }

        const custom: CustomCadenceForm =
          repetition === CadenceRepetition.Custom
            ? {
                intervalNumber: formValue[CadenceFormControl.Custom][CustomCadenceFormControl.IntervalNumber],
                intervalType: formValue[CadenceFormControl.Custom][CustomCadenceFormControl.IntervalType],
                monthlyType: formValue[CadenceFormControl.Custom][CustomCadenceFormControl.MonthlyType],
                weeklyDays: formValue[CadenceFormControl.Custom][CustomCadenceFormControl.WeeklyDays],
              }
            : null;

        const end: CadenceEndForm =
          repetition !== CadenceRepetition.DoNotRepeat
            ? {
                endType: formValue[CadenceFormControl.End][CadenceEndFormControl.EndType],
                endDate: formValue[CadenceFormControl.End][CadenceEndFormControl.EndDate],
                maxSkedsNumber: formValue[CadenceFormControl.End][CadenceEndFormControl.MaxSkedsNumber],
              }
            : null;

        this.valueChange.emit({startDateTime, repetition, custom, end});
        this.validityChange.emit(this.form.valid);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.required) {
      this.form.setValidators(cadenceFormValidator(this.required));
    }
    if (changes.value && this.value) {
      this.fillInForm(this.value);
    }
  }

  private fillInForm(form: CadenceForm) {
    this.dateControl.setValue(form.startDateTime);
    this.timeControl.setValue(form.startDateTime);
    this.repetitionControl.setValue(form.repetition || CadenceRepetition.DoNotRepeat);

    this.intervalNumberControl.setValue(form.custom?.intervalNumber || 1);
    this.intervalTypeControl.setValue(form.custom?.intervalType || CadenceIntervalType.Week);
    this.monthlyTypeControl.setValue(form.custom?.monthlyType || CadenceMonthlyType.DayOfMonth);

    const defaultDayOfWeek =
      form.startDateTime && this.intervalTypeControl.value === CadenceIntervalType.Week
        ? [moment(form.startDateTime).day()]
        : [];
    this.weeklyDaysControl.setValue(form.custom?.weeklyDays || defaultDayOfWeek);

    this.endTypeControl.setValue(form.end?.endType || CadenceEndType.Never);
    this.endDateControl.setValue(form.end?.endDate);
    this.maxSkedsNumberControl.setValue(form.end?.maxSkedsNumber || 1);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public get dateControl(): AbstractControl {
    return this.form.get(CadenceFormControl.Date);
  }

  public get timeControl(): AbstractControl {
    return this.form.get(CadenceFormControl.Time);
  }

  public get repetitionControl(): AbstractControl {
    return this.form.get(CadenceFormControl.Repetition);
  }

  public get customControl(): AbstractControl {
    return this.form.get(CadenceFormControl.Custom);
  }

  public get intervalNumberControl(): AbstractControl {
    return this.customControl.get(CustomCadenceFormControl.IntervalNumber);
  }

  public get intervalTypeControl(): AbstractControl {
    return this.customControl.get(CustomCadenceFormControl.IntervalType);
  }

  public get monthlyTypeControl(): AbstractControl {
    return this.customControl.get(CustomCadenceFormControl.MonthlyType);
  }

  public get weeklyDaysControl(): AbstractControl {
    return this.customControl.get(CustomCadenceFormControl.WeeklyDays);
  }

  public get endControl(): AbstractControl {
    return this.form.get(CadenceFormControl.End);
  }

  public get endTypeControl(): AbstractControl {
    return this.endControl.get(CadenceEndFormControl.EndType);
  }

  public get endDateControl(): AbstractControl {
    return this.endControl.get(CadenceEndFormControl.EndDate);
  }

  public get maxSkedsNumberControl(): AbstractControl {
    return this.endControl.get(CadenceEndFormControl.MaxSkedsNumber);
  }
}
