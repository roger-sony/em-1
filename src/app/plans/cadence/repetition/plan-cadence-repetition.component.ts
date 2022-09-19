import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {RuleSchedule} from '../../../core/model/rule-schedule';
import {UpdateCadenceFormAction} from '../../../core/store/forms/forms.action';
import {selectCadenceForm} from '../../../core/store/forms/forms.selector';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {selectRuleScheduleById} from '../../../core/store/rule-schedules/rule-schedules.selector';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';
import {MobileSelectOption} from '../../../shared/mobile/select-page/mobile-select-option';

@Component({
  selector: 'plan-cadence-repetition',
  templateUrl: './plan-cadence-repetition.component.html',
  styleUrls: ['./plan-cadence-repetition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCadenceRepetitionComponent implements OnInit {
  public readonly repetition = CadenceRepetition;

  public options: MobileSelectOption[] = [
    {value: CadenceRepetition.DoNotRepeat},
    {value: CadenceRepetition.EveryMinute},
    {value: CadenceRepetition.Hourly},
    {value: CadenceRepetition.Daily},
    {value: CadenceRepetition.Weekly},
    {value: CadenceRepetition.Monthly},
    {value: CadenceRepetition.Yearly},
    {value: CadenceRepetition.Custom, displayValue: 'Custom...', onClick: () => this.onCustomClick()},
  ];

  public cadenceForm$: Observable<CadenceForm>;
  public ruleSchedule$: Observable<RuleSchedule>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceForm));
    this.ruleSchedule$ = this.observeRuleSchedule();
  }

  private observeRuleSchedule(): Observable<RuleSchedule> {
    return this.store$.pipe(
      select(selectRouterParam('cadenceId')),
      switchMap(id => this.store$.pipe(select(selectRuleScheduleById(id))))
    );
  }

  public onSave([option]: [MobileSelectOption]) {
    this.updateCadenceForm(option.value);
    this.router.navigate(['..'], {relativeTo: this.activatedRoute.parent});
  }

  public onCustomClick() {
    this.updateCadenceForm(CadenceRepetition.Custom);
    this.router.navigate(['./custom'], {relativeTo: this.activatedRoute});
  }

  private updateCadenceForm(repetition: CadenceRepetition) {
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => {
      this.store$.dispatch(new UpdateCadenceFormAction({cadenceForm: {...cadenceForm, repetition}}));
    });
  }
}
