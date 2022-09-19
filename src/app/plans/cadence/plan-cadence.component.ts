import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {CadenceForm} from '../../core/model/form/cadence-form';
import {RuleSchedule} from '../../core/model/rule-schedule';
import {MobileService} from '../../core/page/mobile.service';
import {UpdateCadenceFormAction} from '../../core/store/forms/forms.action';
import {selectCadenceForm} from '../../core/store/forms/forms.selector';
import {selectRouterParam} from '../../core/store/router/router.selector';
import {GetSingleRuleScheduleAction} from '../../core/store/rule-schedules/rule-schedules.action';
import {selectRuleScheduleById} from '../../core/store/rule-schedules/rule-schedules.selector';
import {PlanDialogService} from '../../dialog/plan-dialog.service';
import {convertRuleScheduleToCadenceForm} from '../../shared/utils/plans/convert-rule-schedule-to-cadence-form';
import {TitleService} from '../../core/page/title.service';

@Component({
  selector: 'plan-cadence',
  templateUrl: './plan-cadence.component.html',
  styleUrls: ['./plan-cadence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCadenceComponent implements OnInit, OnDestroy {
  public planId$: Observable<string>;
  public cadenceId$: Observable<string>;

  private ruleSchedule$: Observable<RuleSchedule>;
  private cadenceForm$: Observable<CadenceForm>;
  private savedCadenceForm$: Observable<CadenceForm>;

  private subscriptions = new Subscription();

  constructor(
    private planDialogService: PlanDialogService,
    private mobileService: MobileService,
    private router: Router,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  public ngOnInit(): void {
    this.planId$ = this.store$.pipe(select(selectRouterParam('planId')));
    this.cadenceId$ = this.store$.pipe(select(selectRouterParam('cadenceId')));
    this.subscriptions.add(this.subscribeToCadenceId());

    this.ruleSchedule$ = this.observeRuleSchedule();
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceForm));
    this.savedCadenceForm$ = this.observeSavedCadenceForm();
    this.subscriptions.add(this.subscribeToCadenceForms());

    this.subscriptions.add(this.subscribeToDesktopSwitch());
    this.subscriptions.add(this.titleService.subscribeToPlanPageTitle('Edit Cadence'));
  }

  private observeRuleSchedule(): Observable<RuleSchedule> {
    return this.cadenceId$.pipe(switchMap(id => this.store$.pipe(select(selectRuleScheduleById(id)))));
  }

  private observeSavedCadenceForm(): Observable<CadenceForm> {
    return this.ruleSchedule$.pipe(map(ruleSchedule => convertRuleScheduleToCadenceForm(ruleSchedule)));
  }

  private subscribeToCadenceForms(): Subscription {
    return combineLatest([this.cadenceForm$, this.savedCadenceForm$.pipe(filter(form => !!form))])
      .pipe(take(1))
      .subscribe(([cadenceForm, savedCadenceForm]) => {
        if (!cadenceForm && savedCadenceForm) {
          this.store$.dispatch(new UpdateCadenceFormAction({cadenceForm: savedCadenceForm}));
        }
      });
  }

  private subscribeToDesktopSwitch(): Subscription {
    return this.mobileService
      .observeSingleDesktopSwitch()
      .pipe(withLatestFrom(this.planId$, this.cadenceId$))
      .subscribe(([mobile, planId, cadenceId]) => {
        const url = planId ? `/plans/${planId}` : '/plans'; // TODO use returnTo?
        this.router
          .navigate([url], {
            queryParams: {returnTo: null},
            queryParamsHandling: 'merge',
          })
          .then(() => this.openCadenceDesktopDialog(planId, cadenceId));
      });
  }

  private openCadenceDesktopDialog(planId: string, cadenceId: string) {
    if (cadenceId) {
      this.planDialogService.openSetCadenceDialog(planId, cadenceId);
    } else if (planId) {
      this.planDialogService.openSetCadenceDialog(planId);
    } else {
      this.planDialogService.openNewPlanDialogCadence();
    }
  }

  private subscribeToCadenceId(): Subscription {
    return this.cadenceId$
      .pipe(
        filter(cadenceId => !!cadenceId),
        distinctUntilChanged()
      )
      .subscribe(id => this.store$.dispatch(new GetSingleRuleScheduleAction({id})));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
