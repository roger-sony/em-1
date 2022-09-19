import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {CadenceForm, CadenceFormPage} from '../../../core/model/form/cadence-form';
import {RuleSchedule} from '../../../core/model/rule-schedule';
import {MobileService} from '../../../core/page/mobile.service';
import {ClearCadenceFormAction, UpdateCadenceFormAction} from '../../../core/store/forms/forms.action';
import {selectCadenceFormByPage} from '../../../core/store/forms/forms.selector';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {
  CreateRuleScheduleAction,
  DeleteRuleScheduleAction,
  GetSingleRuleScheduleAction,
} from '../../../core/store/rule-schedules/rule-schedules.action';
import {selectRuleScheduleById} from '../../../core/store/rule-schedules/rule-schedules.selector';
import {MessageService} from '../../../services/message.service';
import {areCadenceFormsEqual} from '../../../shared/utils/plans/are-cadence-forms-equal';
import {convertCadenceFormToRuleSchedule} from '../../../shared/utils/plans/convert-cadence-form-to-rule-schedule';
import {convertRuleScheduleToCadenceForm} from '../../../shared/utils/plans/convert-rule-schedule-to-cadence-form';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'set-cadence-dialog',
  templateUrl: './set-cadence-dialog.component.html',
  styleUrls: ['./set-cadence-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetCadenceDialogComponent implements OnInit, OnDestroy {
  private decisionTableId$: Observable<string>;

  private ruleScheduleId$: Observable<string>;
  private ruleSchedule$: Observable<RuleSchedule>;

  private savedCadenceForm$: Observable<CadenceForm>;
  public cadenceForm$: Observable<CadenceForm>;
  private valid$ = new BehaviorSubject(true);

  private changed$: Observable<boolean>;
  public doneDisabled$: Observable<boolean>;

  private loading$ = new BehaviorSubject(false);

  private subscriptions = new Subscription();

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private mobileService: MobileService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public ngOnInit(): void {
    this.decisionTableId$ = this.store$.pipe(select(selectRouterParam('cadencePlanId')));

    this.ruleScheduleId$ = this.store$.pipe(select(selectRouterParam('cadenceId')));
    this.subscriptions.add(this.subscribeToRuleScheduleId());

    this.ruleSchedule$ = this.observeRuleSchedule();
    this.savedCadenceForm$ = this.observeSavedCadenceForm();
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceFormByPage(CadenceFormPage.SetCadence)));
    this.subscriptions.add(this.subscribeToCadenceForms());

    this.changed$ = this.observeChanged();
    this.doneDisabled$ = this.observeDoneDisabled();

    this.subscriptions.add(this.subscribeToMobileSwitch());
  }

  private subscribeToMobileSwitch(): Subscription {
    return this.mobileService
      .observeSingleMobileSwitch()
      .pipe(withLatestFrom(this.decisionTableId$, this.ruleScheduleId$))
      .subscribe(([mobile, planId, cadenceId]) =>
        this.router.navigate([{outlets: {dialog: null}}]).then(() => this.navigateToMobilePage(planId, cadenceId))
      );
  }

  private navigateToMobilePage(planId: string, cadenceId: string) {
    if (cadenceId) {
      return this.router.navigate(['/plans', planId, 'cadence', cadenceId]);
    } else {
      return this.router.navigate(['/plans', planId, 'cadence']);
    }
  }

  private observeRuleSchedule(): Observable<RuleSchedule> {
    return this.ruleScheduleId$.pipe(
      switchMap(cadenceId => this.store$.pipe(select(selectRuleScheduleById(cadenceId))))
    );
  }

  private subscribeToRuleScheduleId(): Subscription {
    return this.ruleScheduleId$
      .pipe(
        filter(id => !!id),
        distinctUntilChanged()
      )
      .subscribe(id => this.store$.dispatch(new GetSingleRuleScheduleAction({id})));
  }

  private observeSavedCadenceForm(): Observable<CadenceForm> {
    return this.ruleSchedule$.pipe(map(ruleSchedule => convertRuleScheduleToCadenceForm(ruleSchedule)));
  }

  private observeChanged(): Observable<boolean> {
    return combineLatest([this.savedCadenceForm$, this.cadenceForm$]).pipe(
      map(([savedForm, form]) => !areCadenceFormsEqual(savedForm, form))
    );
  }

  private observeDoneDisabled(): Observable<boolean> {
    return combineLatest([this.valid$, this.changed$, this.loading$]).pipe(
      map(([valid, changed, loading]) => !valid || !changed || loading)
    );
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

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onFormValueChange(cadenceForm: CadenceForm) {
    this.store$.dispatch(new UpdateCadenceFormAction({cadenceForm}));
  }

  public onFormValidityChange(valid: boolean) {
    this.valid$.next(valid);
  }

  public onDoneClick() {
    combineLatest([this.decisionTableId$, this.ruleSchedule$, this.cadenceForm$])
      .pipe(take(1))
      .subscribe(([decisionTableId, ruleSchedule, cadenceForm]) => {
        if (!cadenceForm) {
          return;
        }

        this.loading$.next(true);
        if (ruleSchedule) {
          this.deleteRuleSchedule(ruleSchedule.id, () => this.createRuleSchedule(decisionTableId, cadenceForm));
        } else {
          this.createRuleSchedule(decisionTableId, cadenceForm);
        }
      });
  }

  private deleteRuleSchedule(id: string, onSuccess: () => void) {
    this.store$.dispatch(
      new DeleteRuleScheduleAction({
        id,
        onSuccess,
        onFailure: () => this.onSaveFailure(),
      })
    );
  }

  private createRuleSchedule(decisionTableId: string, cadenceForm: CadenceForm) {
    const ruleSchedule = convertCadenceFormToRuleSchedule(cadenceForm);
    if (!ruleSchedule) {
      this.onSaveFailure();
      return;
    }

    this.store$.dispatch(
      new CreateRuleScheduleAction({
        ruleSchedule: {
          ...ruleSchedule,
          ruleId: decisionTableId,
        },
        onSuccess: () => this.onSaveSuccess(),
        onFailure: () => this.onSaveFailure(),
      })
    );
  }

  private onSaveSuccess() {
    this.messageService.add('Success! The cadence has been saved!');
    this.dialogService.closeDialog();
    this.store$.dispatch(new ClearCadenceFormAction());
    this.loading$.next(false);
  }

  private onSaveFailure() {
    this.messageService.add('Error: Failed to save the cadence. Please try again.');
    this.loading$.next(false);
  }

  public onClose() {
    this.store$.dispatch(new ClearCadenceFormAction());
  }
}
