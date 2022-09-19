import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {UpdateCadenceFormAction} from '../../../../core/store/forms/forms.action';
import {selectCadenceForm} from '../../../../core/store/forms/forms.selector';
import {CadenceForm, CustomCadenceForm} from '../../../../core/model/form/cadence-form';
import {MobileSelectOption} from '../../../../shared/mobile/select-page/mobile-select-option';

@Component({
  selector: 'plan-cadence-custom-weekly',
  templateUrl: './plan-cadence-custom-weekly.component.html',
  styleUrls: ['./plan-cadence-custom-weekly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCadenceCustomWeeklyComponent implements OnInit {
  public readonly options: MobileSelectOption[] = [
    {value: 0, displayValue: 'Sunday'},
    {value: 1, displayValue: 'Monday'},
    {value: 2, displayValue: 'Tuesday'},
    {value: 3, displayValue: 'Wednesday'},
    {value: 4, displayValue: 'Thursday'},
    {value: 5, displayValue: 'Friday'},
    {value: 6, displayValue: 'Saturday'},
  ];

  public cadenceForm$: Observable<CadenceForm>;
  public weeklyDays$: Observable<number[]>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit() {
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceForm));
    this.weeklyDays$ = this.cadenceForm$.pipe(
      map(cadenceForm => cadenceForm?.custom?.weeklyDays || [Number((cadenceForm?.startDateTime || moment()).day())])
    );
  }

  public onSave(selectedOptions: MobileSelectOption[]) {
    this.updateCadenceForm(selectedOptions.map(option => option.value));
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }

  private updateCadenceForm(weeklyDays: number[]) {
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => {
      const custom: CustomCadenceForm = {...cadenceForm?.custom, weeklyDays};
      this.store$.dispatch(new UpdateCadenceFormAction({cadenceForm: {...cadenceForm, custom}}));
    });
  }
}
