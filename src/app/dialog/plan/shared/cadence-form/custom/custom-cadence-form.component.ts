import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {OphInputDirective} from '../../../../../shared/design/oph-input/oph-input.directive';
import {CadenceIntervalType} from '../../../../../core/model/form/cadence-interval-type';
import {CadenceMonthlyType} from '../../../../../core/model/form/cadence-monthly-type';
import {CustomCadenceFormControl} from './custom-cadence-form-control';

@Component({
  selector: 'custom-cadence-form',
  templateUrl: './custom-cadence-form.component.html',
  styleUrls: ['./custom-cadence-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCadenceFormComponent implements OnInit {
  @Input()
  public date: Moment;

  @Input()
  public form: FormGroup;

  @ViewChild(OphInputDirective)
  public input: OphInputDirective;

  public readonly control = CustomCadenceFormControl;
  public readonly intervalType = CadenceIntervalType;
  public readonly intervalTypes = Object.values(CadenceIntervalType);
  public readonly monthlyType = CadenceMonthlyType;

  public intervalNumberValue$: Observable<number>;
  public intervalTypeValue$: Observable<CadenceIntervalType>;

  public ngOnInit(): void {
    this.intervalNumberValue$ = this.intervalNumberControl.valueChanges.pipe(
      startWith(this.intervalNumberControl.value)
    );
    this.intervalTypeValue$ = this.intervalTypeControl.valueChanges.pipe(startWith(this.intervalTypeControl.value));
  }

  public onIntervalTypeChange(type: CadenceIntervalType) {
    if (type === CadenceIntervalType.Week && this.date) {
      this.weeklyDaysControl.setValue([moment(this.date).day()]);
    }
  }

  public get intervalNumberControl(): AbstractControl {
    return this.form.get(CustomCadenceFormControl.IntervalNumber);
  }

  public get intervalTypeControl(): AbstractControl {
    return this.form.get(CustomCadenceFormControl.IntervalType);
  }

  public get weeklyDaysControl(): AbstractControl {
    return this.form.get(CustomCadenceFormControl.WeeklyDays);
  }
}
