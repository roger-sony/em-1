import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Moment} from 'moment';
import * as moment from 'moment';
import {BehaviorSubject, Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {CadenceFormControl} from '../../../../dialog/plan/shared/cadence-form/cadence-form-control';

@Component({
  selector: 'plan-cadence-start',
  templateUrl: './plan-cadence-start.component.html',
  styleUrls: ['./plan-cadence-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCadenceStartComponent implements OnInit {
  @Input()
  public form: FormGroup;

  public readonly calendarShown$ = new BehaviorSubject(true);

  public readonly controls = CadenceFormControl;
  public readonly tomorrow = moment().add(1, 'day').startOf('day');
  public readonly today = moment().startOf('day');

  public date$: Observable<Moment>;
  public time$: Observable<Moment>;

  public ngOnInit() {
    this.date$ = this.dateControl.valueChanges.pipe(startWith(this.dateControl.value));
    this.time$ = this.timeControl.valueChanges.pipe(startWith(this.timeControl.value));
  }

  public onDateButtonClick() {
    this.calendarShown$.next(true);
  }

  public onTimeButtonClick() {
    this.calendarShown$.next(false);
  }

  public onDateChange(date: Moment) {
    this.dateControl.setValue(date);
  }

  public get dateControl(): AbstractControl {
    return this.form?.get(CadenceFormControl.Date);
  }

  public get timeControl(): AbstractControl {
    return this.form?.get(CadenceFormControl.Time);
  }
}
