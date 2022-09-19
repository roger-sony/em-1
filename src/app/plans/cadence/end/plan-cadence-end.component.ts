import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Moment} from 'moment';
import {Observable} from 'rxjs';
import {startWith, take} from 'rxjs/operators';
import {UpdateCadenceFormAction} from '../../../core/store/forms/forms.action';
import {selectCadenceForm} from '../../../core/store/forms/forms.selector';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceEndFormControl} from '../../../dialog/plan/shared/cadence-form/end/cadence-end-form-control';
import {CadenceEndType} from '../../../core/model/form/cadence-end-type';

@Component({
  selector: 'plan-cadence-end',
  templateUrl: './plan-cadence-end.component.html',
  styleUrls: ['./plan-cadence-end.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCadenceEndComponent implements OnInit {
  @ViewChild('skedNumberInput')
  public skedNumberInput: ElementRef<HTMLInputElement>;

  public readonly form = new FormGroup({
    [CadenceEndFormControl.EndType]: new FormControl(CadenceEndType.Never),
    [CadenceEndFormControl.EndDate]: new FormControl(null),
    [CadenceEndFormControl.MaxSkedsNumber]: new FormControl(1),
  });

  public readonly controls = CadenceEndFormControl;
  public readonly endTypes = CadenceEndType;

  public cadenceForm$: Observable<CadenceForm>;

  public endType$: Observable<CadenceEndType>;
  public endDate$: Observable<Moment>;
  public maxSkedsNumber$: Observable<number>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceForm));
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => this.fillInForm(cadenceForm));

    this.endType$ = this.endTypeControl.valueChanges.pipe(startWith(this.endTypeControl.value));
    this.endDate$ = this.endDateControl.valueChanges.pipe(startWith(this.endDateControl.value));
    this.maxSkedsNumber$ = this.maxSkedsNumberControl.valueChanges.pipe(startWith(this.maxSkedsNumberControl.value));
  }

  private fillInForm(cadenceForm: CadenceForm) {
    this.endTypeControl.setValue(cadenceForm?.end?.endType || CadenceEndType.Never);
    this.endDateControl.setValue(cadenceForm?.end?.endDate);
    this.maxSkedsNumberControl.setValue(cadenceForm?.end?.maxSkedsNumber || 1);
  }

  public onBack() {
    this.updateCadenceForm();
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }

  private updateCadenceForm() {
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => {
      this.store$.dispatch(
        new UpdateCadenceFormAction({
          cadenceForm: {
            ...cadenceForm,
            end: {
              endType: this.endTypeControl.value,
              endDate: this.endTypeControl.value === CadenceEndType.EndDate ? this.endDateControl.value : null,
              maxSkedsNumber:
                this.endTypeControl.value === CadenceEndType.MaxSkedsNumber ? this.maxSkedsNumberControl.value : null,
            },
          },
        })
      );
    });
  }

  public onNeverClick() {
    this.endTypeControl.setValue(CadenceEndType.Never);
  }

  public onEndDateClick() {
    this.endTypeControl.setValue(CadenceEndType.EndDate);
  }

  public onMaxSkedsClick() {
    this.endTypeControl.setValue(CadenceEndType.MaxSkedsNumber);
    setTimeout(() => this.skedNumberInput?.nativeElement.focus());
  }

  public onDateChange(date: Moment) {
    this.endDateControl.setValue(date);
  }

  public get endTypeControl(): AbstractControl {
    return this.form.get(CadenceEndFormControl.EndType);
  }

  public get endDateControl(): AbstractControl {
    return this.form.get(CadenceEndFormControl.EndDate);
  }

  public get maxSkedsNumberControl(): AbstractControl {
    return this.form.get(CadenceEndFormControl.MaxSkedsNumber);
  }
}
