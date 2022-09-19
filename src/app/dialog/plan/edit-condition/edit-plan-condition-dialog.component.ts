import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {FieldValues} from 'src/app/core/model/field-values';
import {ConditionForm} from 'src/app/core/model/condition-form';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {selectDecisionTableByIdFromUrl} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {selectAllInventoryItems, selectFieldValues} from 'src/app/core/store/inventory/inventory.selector';
import {selectAllTasks} from 'src/app/core/store/tasks/tasks.selector';
import {selectAllUnitOfMeasures} from 'src/app/core/store/unit-of-measures/unit-of-measures.selector';
import {convertConditionFormToTableRule} from '../../../shared/utils/plans/convert-condition-form-to-table-rule';
import {convertTableRuleToConditionForm} from '../../../shared/utils/plans/convert-table-rule-to-condition-form';
import {DialogService} from '../../dialog.service';
import {MessageService} from 'src/app/services/message.service';
import {UpdateDecisionTableAction} from '../../../core/store/decision-tables/decision-tables.action';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'edit-plan-condition-dialog',
  templateUrl: './edit-plan-condition-dialog.component.html',
  styleUrls: ['./edit-plan-condition-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlanConditionDialogComponent implements OnInit {
  public unitOfMeasures$: Observable<UnitOfMeasure[]>;
  public tasks$: Observable<Task[]>;
  public activePlan$: Observable<DecisionTable>;
  public fieldValues$: Observable<FieldValues>;
  public initialConditionForm$: Observable<ConditionForm>;
  public conditionId$: Observable<string>;
  public nouns$: Observable<InventoryItem[]>;

  public conditionForm$ = new BehaviorSubject<ConditionForm>(null);
  public valid$ = new BehaviorSubject<boolean>(false);

  constructor(private dialogService: DialogService, private messageService: MessageService, private store$: Store) {}

  ngOnInit(): void {
    this.unitOfMeasures$ = this.store$.pipe(select(selectAllUnitOfMeasures));
    this.tasks$ = this.store$.pipe(select(selectAllTasks));
    this.fieldValues$ = this.store$.pipe(select(selectFieldValues));
    this.activePlan$ = this.store$.pipe(select(selectDecisionTableByIdFromUrl));
    this.conditionId$ = this.store$.pipe(select(selectRouterParam('conditionId')));
    this.nouns$ = this.store$.pipe(select(selectAllInventoryItems));

    this.initialConditionForm$ = this.observeActivePlan();
  }

  public observeActivePlan(): Observable<ConditionForm> {
    return combineLatest([this.activePlan$, this.conditionId$]).pipe(
      map(([plan, conditionId]) => {
        if (plan && conditionId) {
          const condition = plan.newTableRules.find(rule => String(rule.id) === String(conditionId));
          return convertTableRuleToConditionForm(condition);
        }
      })
    );
  }

  public onConditionFormValueChange(conditionForm: ConditionForm) {
    this.conditionForm$.next(conditionForm);
  }

  public onValidityChange(value: boolean) {
    this.valid$.next(value);
  }

  public onEditClick() {
    combineLatest([this.conditionForm$, this.activePlan$])
      .pipe(take(1))
      .subscribe(([conditionForm, plan]) => {
        const tableRules = [...plan.newTableRules];
        const newTableRule = convertConditionFormToTableRule(conditionForm);
        tableRules[tableRules.findIndex(rule => rule.id === newTableRule.id)] = newTableRule;
        const decisionTable = {...plan, newTableRules: tableRules};
        this.store$.dispatch(
          new UpdateDecisionTableAction({
            decisionTable,
            onSuccess: () => this.onEditSuccess(),
            onFailure: () => this.onEditFailure(),
          })
        );
      });
  }

  public onEditSuccess() {
    this.messageService.add('Success! Plan has been edited.');
    this.dialogService.closeDialog();
  }

  public onEditFailure() {
    this.messageService.add('Error! Plan was not edited.');
  }
}
