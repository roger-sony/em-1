import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {DEFAULT_TRIGGER_FORM_VALUE, TriggerForm, TriggerFormPage} from '../../../core/model/form/trigger-form';
import {TriggerFormType} from '../../../core/model/form/trigger-form-type';
import {MobileService} from '../../../core/page/mobile.service';
import {ClearTriggerFormAction, UpdateTriggerFormAction} from '../../../core/store/forms/forms.action';
import {selectTriggerFormByPage} from '../../../core/store/forms/forms.selector';
import {CreateNounRuleTriggerAction} from '../../../core/store/noun-rule-triggers/noun-rule-triggers.action';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {CreateTaskRuleTriggerAction} from '../../../core/store/task-rule-triggers/task-rule-triggers.action';
import {MessageService} from '../../../services/message.service';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'new-trigger-dialog',
  templateUrl: './new-trigger-dialog.component.html',
  styleUrls: ['./new-trigger-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTriggerDialogComponent implements OnInit, OnDestroy {
  private planId$: Observable<string>;

  public triggerForm$: Observable<TriggerForm>;
  private triggerFormValid$ = new BehaviorSubject(true);

  private loading$ = new BehaviorSubject(false);
  public doneDisabled$: Observable<boolean>;

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

    this.doneDisabled$ = this.observeDoneDisabled();
    this.triggerForm$ = this.observeTriggerForm();

    this.subscriptions.add(this.subscribeToMobileSwitch());
  }

  private observeDoneDisabled(): Observable<boolean> {
    return combineLatest([this.triggerFormValid$, this.loading$]).pipe(map(([valid, loading]) => !valid || loading));
  }

  private observeTriggerForm(): Observable<TriggerForm> {
    return this.store$.pipe(
      select(selectTriggerFormByPage(TriggerFormPage.AddTrigger)),
      map(triggerForm => triggerForm || DEFAULT_TRIGGER_FORM_VALUE)
    );
  }

  private subscribeToMobileSwitch(): Subscription {
    return this.mobileService
      .observeSingleMobileSwitch()
      .pipe(withLatestFrom(this.planId$))
      .subscribe(([mobile, planId]) =>
        this.router
          .navigate([{outlets: {dialog: null}}])
          .then(() => this.router.navigate(['/plans', planId, 'trigger']))
      );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onFormValueChange(triggerForm: TriggerForm) {
    this.store$.dispatch(new UpdateTriggerFormAction({triggerForm}));
  }

  public onFormValidityChange(valid: boolean) {
    this.triggerFormValid$.next(valid);
  }

  public onDoneClick() {
    combineLatest([this.planId$, this.triggerForm$, this.triggerFormValid$])
      .pipe(take(1))
      .subscribe(([planId, triggerForm, triggerFormValid]) => {
        if (triggerFormValid) {
          this.createTrigger(planId, triggerForm);
        }
      });
  }

  public onCancelClick() {
    this.store$.dispatch(new ClearTriggerFormAction());
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
        onSuccess: () => this.onCreateTriggerSuccess(),
        onFailure: () => this.onCreateTriggerFailure(),
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
        onSuccess: () => this.onCreateTriggerSuccess(),
        onFailure: () => this.onCreateTriggerFailure(),
      })
    );
  }

  private onCreateTriggerSuccess() {
    this.messageService.add('Success! The trigger has been saved!');
    this.store$.dispatch(new ClearTriggerFormAction());
    this.dialogService.closeDialog();
  }

  private onCreateTriggerFailure() {
    this.messageService.add('Error: Failed to save the trigger. Please try again.');
  }
}
