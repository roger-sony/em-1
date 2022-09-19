import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap, take} from 'rxjs/operators';
import {TriggerForm} from 'src/app/core/model/form/trigger-form';
import {TriggerFormType} from '../../../core/model/form/trigger-form-type';
import {NounRuleTrigger} from '../../../core/model/noun-rule-trigger';
import {TaskRuleTrigger} from '../../../core/model/task-rule-trigger';
import {ClearTriggerFormAction, UpdateTriggerFormAction} from '../../../core/store/forms/forms.action';
import {selectTriggerForm} from '../../../core/store/forms/forms.selector';
import {
  CreateNounRuleTriggerAction,
  DeleteNounRuleTriggerAction,
} from '../../../core/store/noun-rule-triggers/noun-rule-triggers.action';
import {selectNounRuleTriggerById} from '../../../core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {
  CreateTaskRuleTriggerAction,
  DeleteTaskRuleTriggerAction,
} from '../../../core/store/task-rule-triggers/task-rule-triggers.action';
import {selectTaskRuleTriggerById} from '../../../core/store/task-rule-triggers/task-rule-triggers.selector';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'plan-trigger-home',
  templateUrl: './plan-trigger-home.component.html',
  styleUrls: ['./plan-trigger-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTriggerHomeComponent implements OnInit {
  public planId$: Observable<string>;

  public triggerId$: Observable<string>;
  private trigger$: Observable<NounRuleTrigger | TaskRuleTrigger>;

  public triggerForm$: Observable<TriggerForm>;
  private triggerFormValid$ = new BehaviorSubject(true);

  private loading$ = new BehaviorSubject(false);
  public saveDisabled$: Observable<boolean>;

  constructor(private messageService: MessageService, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.planId$ = this.store$.pipe(select(selectRouterParam('planId')));
    this.triggerId$ = this.store$.pipe(select(selectRouterParam('triggerId')));
    this.trigger$ = this.observeTrigger();
    this.triggerForm$ = this.store$.pipe(select(selectTriggerForm));
    this.saveDisabled$ = this.observeSaveDisabled();
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

  private observeSaveDisabled(): Observable<boolean> {
    return combineLatest([this.triggerFormValid$, this.loading$]).pipe(map(([valid, loading]) => !valid || loading));
  }

  public onFormValueChange(triggerForm: TriggerForm) {
    this.store$.dispatch(new UpdateTriggerFormAction({triggerForm}));
  }

  public onFormValidityChange(valid: boolean) {
    this.triggerFormValid$.next(valid);
  }

  public onBackClick() {
    this.planId$.pipe(take(1)).subscribe(planId => {
      if (planId) {
        this.router.navigate(['/plans', planId]).then(() => this.store$.dispatch(new ClearTriggerFormAction()));
      } else {
        this.router.navigate(['/plans/new']).then(() => this.store$.dispatch(new ClearTriggerFormAction()));
      }
    });
  }

  public onSave() {
    combineLatest([this.planId$, this.trigger$, this.triggerForm$])
      .pipe(take(1))
      .subscribe(([planId, trigger, triggerForm]) => {
        if (planId && trigger) {
          this.loading$.next(true);
          this.updateTrigger(trigger, triggerForm);
        } else if (planId) {
          this.loading$.next(true);
          this.createTrigger(planId, triggerForm);
        } else {
          this.router.navigate(['/plans/new']);
        }
      });
  }

  private createTrigger(planId: string, triggerForm: TriggerForm) {
    if (triggerForm.type === TriggerFormType.Noun) {
      this.createNounTrigger(planId, triggerForm);
    } else if (triggerForm.type === TriggerFormType.Task) {
      this.createTaskTrigger(planId, triggerForm);
    }
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
        onSuccess: () => this.onSaveTriggerSuccess(planId),
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
        onSuccess: () => this.onSaveTriggerSuccess(planId),
        onFailure: () => this.onSaveTriggerFailure(),
      })
    );
  }

  private updateTrigger(trigger: NounRuleTrigger | TaskRuleTrigger, triggerForm: TriggerForm) {
    if (this.isTriggerChanged(trigger, triggerForm)) {
      this.deleteTrigger(trigger, () => this.createTrigger(trigger.ruleId, triggerForm));
    } else {
      this.router.navigate(['/plans', trigger.ruleId]);
    }
  }

  private isTriggerChanged(trigger: NounRuleTrigger | TaskRuleTrigger, triggerForm: TriggerForm): boolean {
    const nounTrigger = trigger as NounRuleTrigger;
    const taskTrigger = trigger as TaskRuleTrigger;

    if (triggerForm.type === TriggerFormType.Noun && nounTrigger?.nounSubcategory) {
      return triggerForm.noun?.displayName !== nounTrigger.nounSubcategory;
    } else if (triggerForm.type === TriggerFormType.Task && taskTrigger?.taskId) {
      return triggerForm.task?.id !== taskTrigger.taskId || triggerForm.task?.event !== taskTrigger.taskEvent;
    } else {
      return true;
    }
  }

  private deleteTrigger(trigger: NounRuleTrigger | TaskRuleTrigger, onSuccess: () => void) {
    if ((trigger as NounRuleTrigger)?.nounSubcategory) {
      this.store$.dispatch(new DeleteNounRuleTriggerAction({id: trigger.id, onSuccess}));
    } else if ((trigger as TaskRuleTrigger)?.taskId) {
      this.store$.dispatch(new DeleteTaskRuleTriggerAction({id: trigger.id, onSuccess}));
    }
  }

  private onSaveTriggerSuccess(planId: string) {
    this.messageService.add('Success! The trigger has been saved!');
    this.store$.dispatch(new ClearTriggerFormAction());
    this.router.navigate(['/plans', planId]);
    this.loading$.next(false);
  }

  private onSaveTriggerFailure() {
    this.messageService.add('Error: Failed to save the trigger. Please try again.');
    this.loading$.next(false);
  }
}
