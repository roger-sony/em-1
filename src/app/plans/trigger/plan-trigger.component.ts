import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {MobileService} from 'src/app/core/page/mobile.service';
import {TriggerForm} from '../../core/model/form/trigger-form';
import {TriggerFormType} from '../../core/model/form/trigger-form-type';
import {NounRuleTrigger} from '../../core/model/noun-rule-trigger';
import {TaskEvent} from '../../core/model/task-event';
import {TaskRuleTrigger} from '../../core/model/task-rule-trigger';
import {UpdateTriggerFormAction} from '../../core/store/forms/forms.action';
import {selectTriggerForm} from '../../core/store/forms/forms.selector';
import {selectInventoryItemBySubcategory} from '../../core/store/inventory/inventory.selector';
import {GetSingleNounRuleTriggerAction} from '../../core/store/noun-rule-triggers/noun-rule-triggers.action';
import {selectNounRuleTriggerById} from '../../core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectRouterParam} from '../../core/store/router/router.selector';
import {GetSingleTaskRuleTriggerAction} from '../../core/store/task-rule-triggers/task-rule-triggers.action';
import {selectTaskRuleTriggerById} from '../../core/store/task-rule-triggers/task-rule-triggers.selector';
import {selectTaskById} from '../../core/store/tasks/tasks.selector';
import {PlanDialogService} from '../../dialog/plan-dialog.service';
import {TitleService} from '../../core/page/title.service';

@Component({
  selector: 'plan-trigger',
  templateUrl: './plan-trigger.component.html',
  styleUrls: ['./plan-trigger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTriggerComponent implements OnInit, OnDestroy {
  private planId$: Observable<string>;
  private triggerId$: Observable<string>;

  private trigger$: Observable<NounRuleTrigger | TaskRuleTrigger>;
  private triggerForm$: Observable<TriggerForm>;
  private savedTriggerForm$: Observable<TriggerForm>;

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
    this.triggerId$ = this.store$.pipe(select(selectRouterParam('triggerId')));
    this.subscriptions.add(this.subscribeToTriggerId());

    this.trigger$ = this.observeTrigger();
    this.triggerForm$ = this.store$.pipe(select(selectTriggerForm));
    this.savedTriggerForm$ = this.observeSavedTriggerForm();
    this.subscriptions.add(this.subscribeToTriggerForms());

    this.subscriptions.add(this.subscribeToDesktopSwitch());

    this.setPageTitle();
  }

  private setPageTitle() {
    this.triggerId$.pipe(take(1)).subscribe(triggerId => {
      this.subscriptions.add(this.titleService.subscribeToPlanPageTitle(triggerId ? 'Edit Trigger' : 'New Trigger'));
    });
  }

  private observeTrigger(): Observable<NounRuleTrigger | TaskRuleTrigger> {
    return this.triggerId$.pipe(distinctUntilChanged()).pipe(
      switchMap(triggerId =>
        this.store$.pipe(
          select(selectNounRuleTriggerById(triggerId)),
          switchMap(nounTrigger =>
            nounTrigger ? [nounTrigger] : this.store$.pipe(select(selectTaskRuleTriggerById(triggerId)))
          )
        )
      )
    );
  }

  private observeSavedTriggerForm(): Observable<TriggerForm> {
    return this.trigger$.pipe(
      switchMap(trigger => {
        const nounTrigger = trigger as NounRuleTrigger;
        const taskTrigger = trigger as TaskRuleTrigger;

        if (nounTrigger?.nounSubcategory) {
          return this.store$.pipe(
            select(selectInventoryItemBySubcategory(nounTrigger.nounSubcategory)),
            filter(noun => !!noun),
            take(1),
            map(noun => ({
              type: TriggerFormType.Noun,
              noun: {id: noun.id, displayName: nounTrigger.nounSubcategory},
              task: {id: '', displayName: '', event: ''},
              saveReport: trigger.saveReport,
              triggerActions: trigger.triggerActions,
            }))
          );
        } else if (taskTrigger?.taskId) {
          return this.store$.pipe(
            select(selectTaskById(taskTrigger.taskId)),
            filter(task => !!task),
            take(1),
            map(task => ({
              type: TriggerFormType.Task,
              noun: {id: '', displayName: ''},
              task: {
                id: taskTrigger.taskId,
                displayName: task.shortTask,
                event: taskTrigger.taskEvent as TaskEvent,
              },
              saveReport: trigger.saveReport,
              triggerActions: trigger.triggerActions,
            }))
          );
        }

        return [null];
      })
    );
  }

  private subscribeToTriggerForms(): Subscription {
    return combineLatest([this.triggerForm$, this.savedTriggerForm$]).subscribe(([triggerForm, savedTriggerForm]) => {
      if (!triggerForm && savedTriggerForm) {
        this.store$.dispatch(new UpdateTriggerFormAction({triggerForm: savedTriggerForm}));
      }
    });
  }

  private subscribeToTriggerId(): Subscription {
    return this.triggerId$
      .pipe(
        filter(triggerId => !!triggerId),
        distinctUntilChanged()
      )
      .subscribe(id => {
        this.store$.dispatch(new GetSingleNounRuleTriggerAction({id, ignoreErrors: true}));
        this.store$.dispatch(new GetSingleTaskRuleTriggerAction({id, ignoreErrors: true}));
      });
  }

  private subscribeToDesktopSwitch(): Subscription {
    return this.mobileService
      .observeSingleDesktopSwitch()
      .pipe(withLatestFrom(this.planId$, this.trigger$))
      .subscribe(([mobile, planId, trigger]) => {
        const url = planId ? `/plans/${planId}` : '/plans';
        this.router
          .navigate([url], {
            queryParams: {returnTo: null},
            queryParamsHandling: 'merge',
          })
          .then(() => this.openDesktopDialog(planId, trigger));
      });
  }

  private openDesktopDialog(planId: string, trigger: NounRuleTrigger | TaskRuleTrigger) {
    if (trigger && (trigger as NounRuleTrigger).nounSubcategory) {
      this.planDialogService.openEditNounTriggerDialog(planId, trigger.id);
    } else if (trigger && (trigger as TaskRuleTrigger).taskId) {
      this.planDialogService.openEditTaskTriggerDialog(planId, trigger.id);
    } else if (planId) {
      this.planDialogService.openNewTriggerDialog(planId);
    } else {
      this.planDialogService.openNewPlanDialogTrigger();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
