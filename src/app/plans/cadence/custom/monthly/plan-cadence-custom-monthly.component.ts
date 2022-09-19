import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {UpdateCadenceFormAction} from '../../../../core/store/forms/forms.action';
import {selectCadenceForm} from '../../../../core/store/forms/forms.selector';
import {CadenceForm, CustomCadenceForm} from '../../../../core/model/form/cadence-form';
import {CadenceMonthlyType} from '../../../../core/model/form/cadence-monthly-type';
import {MobileSelectOption} from '../../../../shared/mobile/select-page/mobile-select-option';
import {formatCadenceFormMonthlyType} from '../../../../shared/utils/plans/format-cadence-form-monthly-type';

@Component({
  selector: 'plan-cadence-custom-monthly',
  templateUrl: './plan-cadence-custom-monthly.component.html',
  styleUrls: ['./plan-cadence-custom-monthly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCadenceCustomMonthlyComponent implements OnInit {
  public readonly monthlyTypes = CadenceMonthlyType;

  public options: MobileSelectOption[] = [];

  public cadenceForm$: Observable<CadenceForm>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceForm));
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => (this.options = this.createOptions(cadenceForm)));
  }

  private createOptions(cadenceForm: CadenceForm): MobileSelectOption[] {
    return [
      {
        value: CadenceMonthlyType.DayOfMonth,
        displayValue: formatCadenceFormMonthlyType({
          ...cadenceForm,
          custom: {...cadenceForm?.custom, monthlyType: CadenceMonthlyType.DayOfMonth},
        }),
      },
      {
        value: CadenceMonthlyType.DayOfWeek,
        displayValue: formatCadenceFormMonthlyType({
          ...cadenceForm,
          custom: {...cadenceForm?.custom, monthlyType: CadenceMonthlyType.DayOfWeek},
        }),
      },
    ];
  }

  public onSave([selectedOption]: [MobileSelectOption]) {
    this.updateCadenceForm(selectedOption.value);
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }

  private updateCadenceForm(monthlyType: CadenceMonthlyType) {
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => {
      const custom: CustomCadenceForm = {...cadenceForm?.custom, monthlyType};
      this.store$.dispatch(new UpdateCadenceFormAction({cadenceForm: {...cadenceForm, custom}}));
    });
  }
}
