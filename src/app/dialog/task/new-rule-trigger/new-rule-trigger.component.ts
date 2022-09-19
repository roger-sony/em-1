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
  selector: 'new-rule-trigger',
  templateUrl: './new-rule-trigger.component.html',
  styleUrls: ['./new-rule-trigger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRuleTriggerComponent implements OnInit {
  public taskId$: Observable<string>;
  public storedRuleTriggers$: Observable<TaskRuleTrigger[]>;
  public plans$: Observable<DecisionTable[]>;
  public plansMap$: Observable<Record<string, DecisionTable>>;

  public ruleTriggerForm$ = new BehaviorSubject<TaskRuleTrigger>(null);
  public valid$ = new BehaviorSubject<boolean>(false);

  constructor(private dialog: MatDialogRef<NewRuleTriggerComponent>, private router: Router, private store$: Store) {}

  ngOnInit(): void {
    this.taskId$ = this.store$.pipe(select(selectRouterParam('taskId')));
    this.storedRuleTriggers$ = this.store$.pipe(select(selectStoredTaskRuleTriggers));
    this.plans$ = this.store$.pipe(select(selectAllDecisionTables));

    this.plansMap$ = this.observePlans();
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
    combineLatest([this.taskId$, this.ruleTriggerForm$, this.storedRuleTriggers$])
      .pipe(take(1))
      .subscribe(([taskId, triggerForm, storedTriggers]) => {
        const trigger = {
          displayName: '',
          ruleId: triggerForm.ruleId,
          taskId,
          taskEvent: triggerForm.taskEvent,
          saveReport: triggerForm.saveReport,
          triggerActions: triggerForm.triggerActions,
        };
        const taskRuleTriggers = storedTriggers ? [...storedTriggers, trigger] : [trigger];
        this.store$.dispatch(new UpdateTaskRuleTriggersAction({taskRuleTriggers}));
        this.router.navigate([], {queryParams: {edited: true}});
        this.dialog.close();
      });
  }
}
