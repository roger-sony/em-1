import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {DecisionTable} from '../../../../core/model/decision-table';
import {CadenceForm, CadenceFormPage} from '../../../../core/model/form/cadence-form';
import {PlanForm} from '../../../../core/model/form/plan-form';
import {DEFAULT_TRIGGER_FORM_VALUE, TriggerForm, TriggerFormPage} from '../../../../core/model/form/trigger-form';
import {MobileService} from '../../../../core/page/mobile.service';
import {CreateDecisionTableWithTriggersAction} from '../../../../core/store/decision-tables/decision-tables.action';
import {ClearAllFormsAction, UpdateTriggerFormAction} from '../../../../core/store/forms/forms.action';
import {
  selectCadenceFormByPage,
  selectPlanForm,
  selectTriggerFormByPage,
} from '../../../../core/store/forms/forms.selector';
import {MessageService} from '../../../../services/message.service';
import {DialogService} from '../../../dialog.service';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';

@Component({
  selector: 'new-plan-trigger-step',
  templateUrl: './new-plan-trigger-step.component.html',
  styleUrls: ['./new-plan-trigger-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanTriggerStepComponent implements OnInit, OnDestroy {
  private planForm$: Observable<PlanForm>;
  private cadenceForm$: Observable<CadenceForm>;

  public triggerForm$: Observable<TriggerForm>;
  private triggerFormValid$ = new BehaviorSubject(true);

  public doneDisabled$: Observable<boolean>;
  public chapterId$: Observable<string>;

  private subscriptions = new Subscription();

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private mobileService: MobileService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public ngOnInit(): void {
    this.planForm$ = this.store$.pipe(select(selectPlanForm));
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceFormByPage(CadenceFormPage.CreatePlan)));
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.triggerForm$ = this.store$.pipe(
      select(selectTriggerFormByPage(TriggerFormPage.CreatePlan)),
      map(triggerForm => triggerForm || DEFAULT_TRIGGER_FORM_VALUE)
    );

    this.doneDisabled$ = combineLatest([this.planForm$, this.triggerFormValid$]).pipe(
      map(([planForm, triggerFormValid]) => !planForm?.name || !triggerFormValid)
    );

    this.subscriptions.add(this.subscribeToMobileSwitch());
  }

  private subscribeToMobileSwitch(): Subscription {
    return this.mobileService.subscribeToMobileSwitch(
      () => this.router.navigate([{outlets: {dialog: null}}]).then(() => this.router.navigate(['/plans/new/trigger'])) // TODO returnTo
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onFormValueChange(triggerForm: TriggerForm) {
    this.store$.dispatch(new UpdateTriggerFormAction({triggerForm}));
  }

  public onFormValidityChange(valid: boolean) {
    this.triggerFormValid$.next(valid);
  }

  public onDone() {
    combineLatest([this.planForm$, this.cadenceForm$, this.triggerForm$])
      .pipe(take(1))
      .subscribe(([planForm, cadenceForm, triggerForm]) =>
        this.createDecisionTable(planForm, cadenceForm, triggerForm)
      );
  }

  private createDecisionTable(planForm: PlanForm, cadenceForm: CadenceForm, triggerForm: TriggerForm) {
    this.store$.dispatch(
      new CreateDecisionTableWithTriggersAction({
        planForm,
        cadenceForm,
        triggerForm,
        onSuccess: decisionTable => this.onCreateDecisionTableSuccess(decisionTable),
        onFailure: () => this.onCreateDecisionTableFailure(),
      })
    );
  }

  private onCreateDecisionTableSuccess(decisionTable: DecisionTable) {
    // TODO show new notification
    this.messageService.add('Success! Your decision table has been saved.');
    this.store$.dispatch(new ClearAllFormsAction());
    this.chapterId$.pipe(take(1)).subscribe(chapterId => {
      if (chapterId) {
        this.router.navigate(['/chapters', chapterId, 'plans']);
      } else {
        this.router.navigate(['/plans', decisionTable.id]);
      }
    });
    this.dialogService.closeDialog();
  }

  private onCreateDecisionTableFailure() {
    // TODO show new notification
    this.messageService.add(`Error: Something went wrong. Please try again.`);
  }
}
