import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
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
import {DialogService} from '../../dialog.service';
import {MessageService} from 'src/app/services/message.service';
import {UpdateDecisionTableAction} from '../../../core/store/decision-tables/decision-tables.action';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'new-plan-condition-dialog',
  templateUrl: './new-plan-condition-dialog.component.html',
  styleUrls: ['./new-plan-condition-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanConditionDialogComponent implements OnInit {
  public unitOfMeasures$: Observable<UnitOfMeasure[]>;
  public tasks$: Observable<Task[]>;
  public activePlan$: Observable<DecisionTable>;
  public fieldValues$: Observable<FieldValues>;
  public nouns$: Observable<InventoryItem[]>;

  public conditionForm$ = new BehaviorSubject<ConditionForm>(null);
  public valid$ = new BehaviorSubject<boolean>(false);

  constructor(private dialogService: DialogService, private messageService: MessageService, private store$: Store) {}

  ngOnInit(): void {
    this.unitOfMeasures$ = this.store$.pipe(select(selectAllUnitOfMeasures));
    this.tasks$ = this.store$.pipe(select(selectAllTasks));
    this.fieldValues$ = this.store$.pipe(select(selectFieldValues));
    this.activePlan$ = this.store$.pipe(select(selectDecisionTableByIdFromUrl));
    this.nouns$ = this.store$.pipe(select(selectAllInventoryItems));
  }

  public onConditionFormValueChange(conditionForm: ConditionForm) {
    this.conditionForm$.next(conditionForm);
  }

  public onValidityChange(value: boolean) {
    this.valid$.next(value);
  }

  public onCreateClick() {
    combineLatest([this.conditionForm$, this.activePlan$])
      .pipe(take(1))
      .subscribe(([conditionForm, plan]) => {
        const tableRules = [...plan.newTableRules];
        const newTableRule = convertConditionFormToTableRule(conditionForm);
        tableRules.push(newTableRule);
        const decisionTable = {...plan, newTableRules: tableRules};
        this.store$.dispatch(
          new UpdateDecisionTableAction({
            decisionTable,
            onSuccess: () => this.onUpdateSuccess(),
            onFailure: () => this.onUpdateFailure(),
          })
        );
      });
  }

  public onUpdateSuccess() {
    this.messageService.add('Success! Plan has been updated.');
    this.dialogService.closeDialog();
  }

  public onUpdateFailure() {
    this.messageService.add('Error! Plan was not updated.');
    this.dialogService.closeDialog();
  }
}
