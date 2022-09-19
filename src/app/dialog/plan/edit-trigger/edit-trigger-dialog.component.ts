import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {TriggerForm, TriggerFormPage} from '../../../core/model/form/trigger-form';
import {TriggerFormType} from '../../../core/model/form/trigger-form-type';
import {NounRuleTrigger} from '../../../core/model/noun-rule-trigger';
import {TaskEvent} from '../../../core/model/task-event';
import {TaskRuleTrigger} from '../../../core/model/task-rule-trigger';
import {MobileService} from '../../../core/page/mobile.service';
import {ClearTriggerFormAction, UpdateTriggerFormAction} from '../../../core/store/forms/forms.action';
import {selectTriggerFormByPage} from '../../../core/store/forms/forms.selector';
import {selectInventoryItemBySubcategory} from '../../../core/store/inventory/inventory.selector';
import {
  CreateNounRuleTriggerAction,
  DeleteNounRuleTriggerAction,
  GetSingleNounRuleTriggerAction,
} from '../../../core/store/noun-rule-triggers/noun-rule-triggers.action';
import {selectNounRuleTriggerById} from '../../../core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {
  CreateTaskRuleTriggerAction,
  DeleteTaskRuleTriggerAction,
  GetSingleTaskRuleTriggerAction,
} from '../../../core/store/task-rule-triggers/task-rule-triggers.action';
import {selectTaskRuleTriggerById} from '../../../core/store/task-rule-triggers/task-rule-triggers.selector';
import {selectTaskById} from '../../../core/store/tasks/tasks.selector';
import {MessageService} from '../../../services/message.service';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'edit-trigger-dialog',
  templateUrl: './edit-trigger-dialog.component.html',
  styleUrls: ['./edit-trigger-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTriggerDialogComponent implements OnInit, OnDestroy {
  private planId$: Observable<string>;
  private triggerId$: Observable<string>;
  private triggerType$: Observable<string>;

  public trigger$: Observable<NounRuleTrigger | TaskRuleTrigger>;
  private savedTriggerForm$: Observable<TriggerForm>;

  public triggerForm$: Observable<TriggerForm>;
  private valid$ = new BehaviorSubject(true);

  private changed$: Observable<boolean>;
  public doneDisabled$: Observable<boolean>;

  public loading$ = new BehaviorSubject(false);

  private subscriptions = new Subscription();

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private mobileService: MobileService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public ngOnInit(): void {
    this.planId$ = this.store$.pipe(select(selectRouterParam('planId')));
    this.triggerId$ = this.store$.pipe(select(selectRouterParam('triggerId')));
    this.triggerType$ = this.store$.pipe(select(selectRouterParam('triggerType')));
    this.subscriptions.add(this.subscribeToTriggerUrlParams());

    this.trigger$ = this.observeTrigger();
    this.triggerForm$ = this.store$.pipe(select(selectTriggerFormByPage(TriggerFormPage.EditTrigger)));
    this.savedTriggerForm$ = this.observeSavedTriggerForm();
    this.subscriptions.add(this.subscribeToTriggerForms());

    this.changed$ = this.observeChanged();
    this.doneDisabled$ = this.observeDoneDisabled();

    this.subscriptions.add(this.subscribeToMobileSwitch());
  }

  private subscribeToMobileSwitch(): Subscription {
    return this.mobileService
      .observeSingleMobileSwitch()
      .pipe(withLatestFrom(this.planId$, this.triggerId$, this.triggerType$))
      .subscribe(([mobile, planId, triggerId, triggerType]) =>
        this.router
          .navigate([{outlets: {dialog: null}}])
          .then(() => this.router.navigate(['/plans', planId, 'trigger', triggerId]))
      );
  }

  private observeChanged(): Observable<boolean> {
    return combineLatest([this.savedTriggerForm$, this.triggerForm$]).pipe(
      map(([savedForm, form]) => JSON.stringify(savedForm) !== JSON.stringify(form)) // TODO improve
    );
  }

  private observeDoneDisabled(): Observable<boolean> {
    return combineLatest([this.valid$, this.changed$, this.loading$]).pipe(
      map(([valid, changed, loading]) => !valid || !changed || loading)
    );
  }

  private observeTrigger(): Observable<NounRuleTrigger | TaskRuleTrigger> {
    return combineLatest([
      this.triggerId$.pipe(distinctUntilChanged()),
      this.triggerType$.pipe(distinctUntilChanged()),
    ]).pipe(
      switchMap(([id, type]) => {
        if (type === TriggerFormType.Noun) {
          return this.store$.pipe(
            select(selectNounRuleTriggerById(id)),
            filter(trigger => !!trigger)
          );
        }
        if (type === TriggerFormType.Task) {
          return this.store$.pipe(
            select(selectTaskRuleTriggerById(id)),
            filter(trigger => !!trigger)
          );
        }
        return [];
      })
    );
  }

  private observeSavedTriggerForm(): Observable<TriggerForm> {
    return this.trigger$.pipe(
      switchMap(trigger => {
        const nounTrigger = trigger as NounRuleTrigger;
        const taskTrigger = trigger as TaskRuleTrigger;

        if (nounTrigger.nounSubcategory) {
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
        } else if (taskTrigger.taskId) {
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

        return [];
      })
    );
  }

  private subscribeToTriggerForms(): Subscription {
    return combineLatest([this.triggerForm$, this.savedTriggerForm$.pipe(filter(form => !!form))])
      .pipe(take(1))
      .subscribe(([triggerForm, savedTriggerForm]) => {
        if (!triggerForm && savedTriggerForm) {
          this.store$.dispatch(new UpdateTriggerFormAction({triggerForm: savedTriggerForm}));
        }
      });
  }

  private subscribeToTriggerUrlParams(): Subscription {
    return combineLatest([
      this.triggerId$.pipe(distinctUntilChanged()),
      this.triggerType$.pipe(distinctUntilChanged()),
    ]).subscribe(([id, type]) => {
      if (type === TriggerFormType.Noun) {
        this.store$.dispatch(new GetSingleNounRuleTriggerAction({id}));
      } else if (type === TriggerFormType.Task) {
        this.store$.dispatch(new GetSingleTaskRuleTriggerAction({id}));
      }
    });
  }

  public onFormValueChange(triggerForm: TriggerForm) {
    this.store$.dispatch(new UpdateTriggerFormAction({triggerForm}));
  }

  public onFormValidityChange(valid: boolean) {
    this.valid$.next(valid);
  }

  public onDoneClick() {
    if (!this.valid$.getValue()) {
      return;
    }

    this.loading$.next(true);
    this.trigger$.pipe(take(1)).subscribe(trigger => {
      const nounTrigger = trigger as NounRuleTrigger;
      const taskTrigger = trigger as TaskRuleTrigger;

      if (nounTrigger.nounSubcategory) {
        this.deleteNounTrigger(nounTrigger);
      } else if (taskTrigger.taskId) {
        this.deleteTaskTrigger(taskTrigger);
      }
    });
  }

  private deleteNounTrigger(trigger: NounRuleTrigger) {
    this.store$.dispatch(
      new DeleteNounRuleTriggerAction({
        id: trigger.id,
        onSuccess: () => this.createTrigger(trigger.ruleId),
        onFailure: () => this.onSaveTriggerFailure(),
      })
    );
  }

  private deleteTaskTrigger(trigger: TaskRuleTrigger) {
    this.store$.dispatch(
      new DeleteTaskRuleTriggerAction({
        id: trigger.id,
        onSuccess: () => this.createTrigger(trigger.ruleId),
        onFailure: () => this.onSaveTriggerFailure(),
      })
    );
  }

  private createTrigger(planId: string) {
    this.triggerForm$.pipe(take(1)).subscribe(triggerForm => {
      if (triggerForm.type === TriggerFormType.Noun) {
        this.createNounTrigger(planId, triggerForm);
      } else if (triggerForm.type === TriggerFormType.Task) {
        this.createTaskTrigger(planId, triggerForm);
      }
    });
  }

  private createNounTrigger(planId: string, triggerForm: TriggerForm) {
    this.store$.dispatch(
      new CreateNounRuleTriggerAction({
        trigger: {
          ruleId: planId,
          nounSubcategory: triggerForm.noun.displayName,
          saveReport: triggerForm.saveReport,
          triggerActions: triggerForm.triggerActions,
        },
        onSuccess: () => this.onSaveTriggerSuccess(),
        onFailure: () => this.onSaveTriggerFailure(),
      })
    );
  }

  private createTaskTrigger(planId: string, triggerForm: TriggerForm) {
    this.store$.dispatch(
      new CreateTaskRuleTriggerAction({
        trigger: {
          ruleId: planId,
          taskId: triggerForm.task.id,
          taskEvent: triggerForm.task.event,
          saveReport: triggerForm.saveReport,
          triggerActions: triggerForm.triggerActions,
        },
        onSuccess: () => this.onSaveTriggerSuccess(),
        onFailure: () => this.onSaveTriggerFailure(),
      })
    );
  }

  private onSaveTriggerSuccess() {
    this.messageService.add('Success! The trigger has been saved!');
    this.store$.dispatch(new ClearTriggerFormAction());
    this.dialogService.closeDialog();
    this.loading$.next(false);
  }

  private onSaveTriggerFailure() {
    this.messageService.add('Error: Failed to save the trigger. Please try again.');
    this.loading$.next(false);
  }

  public onClose() {
    this.store$.dispatch(new ClearTriggerFormAction());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
