import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {TaskRuleTrigger} from 'src/app/core/model/task-rule-trigger';
import {selectAllDecisionTables} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {UpdateTaskRuleTriggersAction} from 'src/app/core/store/tasks/tasks.action';
import {selectStoredTaskRuleTriggers} from 'src/app/core/store/tasks/tasks.selector';

@Component({
  selector: 'edit-rule-trigger',
  templateUrl: './edit-rule-trigger.component.html',
  styleUrls: ['./edit-rule-trigger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRuleTriggerComponent implements OnInit {
  public taskId$: Observable<string>;
  public ruleTriggerIndex$: Observable<string>;
  public storedTaskRuleTriggers$: Observable<TaskRuleTrigger[]>;
  public currentTaskRuleTrigger$: Observable<TaskRuleTrigger>;
  public plans$: Observable<DecisionTable[]>;
  public plansMap$: Observable<Record<string, DecisionTable>>;

  public ruleTriggerForm$ = new BehaviorSubject<TaskRuleTrigger>(null);
  public valid$ = new BehaviorSubject<boolean>(true);

  constructor(private dialog: MatDialogRef<EditRuleTriggerComponent>, private router: Router, private store$: Store) {}

  ngOnInit(): void {
    this.taskId$ = this.store$.pipe(select(selectRouterParam('taskId')));
    this.ruleTriggerIndex$ = this.store$.pipe(select(selectRouterParam('ruleTriggerIndex')));
    this.storedTaskRuleTriggers$ = this.store$.pipe(select(selectStoredTaskRuleTriggers));
    this.plans$ = this.store$.pipe(select(selectAllDecisionTables));

    this.currentTaskRuleTrigger$ = this.observeStoredTaskRuleTriggers();
    this.plansMap$ = this.observePlans();
  }

  public observeStoredTaskRuleTriggers(): Observable<TaskRuleTrigger> {
    return combineLatest([this.ruleTriggerIndex$, this.storedTaskRuleTriggers$]).pipe(
      map(([index, triggers]) => triggers[Number(index)])
    );
  }

  private observePlans(): Observable<Record<string, DecisionTable>> {
    return this.plans$.pipe(
      map(plans =>
        plans.reduce(
          (plansMap: Record<string, DecisionTable>, plan: DecisionTable) => (
            (plansMap[plan.displayName] = plan), plansMap
          ),
          {}
        )
      )
    );
  }

  public onValueChange(value: TaskRuleTrigger) {
    this.ruleTriggerForm$.next(value);
  }

  public onValidityChange(value: boolean) {
    this.valid$.next(value);
  }

  public onSave() {
    combineLatest([
      this.taskId$,
      this.ruleTriggerIndex$,
      this.ruleTriggerForm$,
      this.storedTaskRuleTriggers$,
      this.currentTaskRuleTrigger$,
    ])
      .pipe(take(1))
      .subscribe(([taskId, ruleTriggerIndex, triggerForm, storedTriggers, currentTrigger]) => {
        const newTaskRuleTrigger = {
          id: currentTrigger.id || undefined,
          displayName: currentTrigger.displayName,
          ruleId: triggerForm?.ruleId || currentTrigger.ruleId,
          taskId,
          taskEvent: triggerForm?.taskEvent || currentTrigger.taskEvent,
          saveReport: triggerForm?.saveReport || currentTrigger.saveReport,
          triggerActions: triggerForm?.triggerActions || currentTrigger.triggerActions,
        };
        const taskRuleTriggers = [...storedTriggers];
        taskRuleTriggers[Number(ruleTriggerIndex)] = newTaskRuleTrigger;
        this.store$.dispatch(new UpdateTaskRuleTriggersAction({taskRuleTriggers}));
        this.router.navigate([], {queryParams: {edited: true}});
        this.dialog.close();
      });
  }
}
