import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {startWith, take} from 'rxjs/operators';
import {UpdateCadenceFormAction} from '../../../core/store/forms/forms.action';
import {selectCadenceForm} from '../../../core/store/forms/forms.selector';
import {CadenceForm, CustomCadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';
import {CadenceIntervalType} from '../../../core/model/form/cadence-interval-type';
import {CadenceMonthlyType} from '../../../core/model/form/cadence-monthly-type';
import {CustomCadenceFormControl} from '../../../dialog/plan/shared/cadence-form/custom/custom-cadence-form-control';
import {ListPickerItem} from '../../../shared/mobile/list-picker/list-picker-item';

@Component({
  selector: 'plan-cadence-custom',
  templateUrl: './plan-cadence-custom.component.html',
  styleUrls: ['./plan-cadence-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCadenceCustomComponent implements OnInit {
  public readonly form = new FormGroup({
    [CustomCadenceFormControl.IntervalNumber]: new FormControl(1),
    [CustomCadenceFormControl.IntervalType]: new FormControl(CadenceIntervalType.Week),
    [CustomCadenceFormControl.WeeklyDays]: new FormControl([]),
    [CustomCadenceFormControl.MonthlyType]: new FormControl(CadenceMonthlyType.DayOfMonth),
  });

  public readonly controls = CustomCadenceFormControl;
  public readonly intervalTypes = CadenceIntervalType;

  public readonly intervalNumberOptions: ListPickerItem<number>[] = new Array(99)
    .fill(0)
    .map((item, index) => ({value: index + 1}));

  public readonly intervalTypeOptions: ListPickerItem<CadenceIntervalType>[] = Object.values(CadenceIntervalType).map(
    value => ({value})
  );

  public intervalNumber$: Observable<number>;
  public intervalType$: Observable<CadenceIntervalType>;

  public cadenceForm$: Observable<CadenceForm>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceForm));
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => this.fillInForm(cadenceForm));

    this.intervalNumber$ = this.intervalNumberControl.valueChanges.pipe(startWith(this.intervalNumberControl.value));
    this.intervalType$ = this.intervalTypeControl.valueChanges.pipe(startWith(this.intervalTypeControl.value));
  }

  private fillInForm(cadenceForm: CadenceForm) {
    this.intervalNumberControl.setValue(cadenceForm?.custom?.intervalNumber || 1);
    this.intervalTypeControl.setValue(cadenceForm?.custom?.intervalType || CadenceIntervalType.Week);
  }

  public onBack() {
    this.updateCadenceForm();
    this.router.navigate(['..'], {relativeTo: this.activatedRoute.parent});
  }

  public onWeeklyDaysClick() {
    this.updateCadenceForm();
    this.router.navigate(['./weekly'], {relativeTo: this.activatedRoute});
  }

  public onMonthlyTypeClick() {
    this.updateCadenceForm();
    this.router.navigate(['./monthly'], {relativeTo: this.activatedRoute});
  }

  private updateCadenceForm() {
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => {
      const custom: CustomCadenceForm = {
        ...cadenceForm?.custom,
        intervalNumber: this.intervalNumberControl.value,
        intervalType: this.intervalTypeControl.value,
      };
      const repetition = CadenceRepetition.Custom;
      this.store$.dispatch(new UpdateCadenceFormAction({cadenceForm: {...cadenceForm, custom, repetition}}));
    });
  }

  public get intervalNumberControl(): AbstractControl {
    return this.form.get(CustomCadenceFormControl.IntervalNumber);
  }

  public get intervalTypeControl(): AbstractControl {
    return this.form.get(CustomCadenceFormControl.IntervalType);
  }
}
