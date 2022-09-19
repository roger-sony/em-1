import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ConditionDisplay} from '../../../../../../core/model/condition-display';
import {DecisionTable} from '../../../../../../core/model/decision-table';
import {FieldValues} from '../../../../../../core/model/field-values';
import {Task} from '../../../../../../core/model/task';
import {UnitOfMeasure} from '../../../../../../core/model/unit-of-measure';
import {UpdateDecisionTableAction} from '../../../../../../core/store/decision-tables/decision-tables.action';
import {selectFieldValues} from '../../../../../../core/store/inventory/inventory.selector';
import {selectAllTasks} from '../../../../../../core/store/tasks/tasks.selector';
import {selectUnitOfMeasureByNounSubcategory} from '../../../../../../core/store/unit-of-measures/unit-of-measures.selector';
import {PlanConditionGroup} from '../../util/plan-condition-group';

@Component({
  selector: 'plan-noun-card-content',
  templateUrl: './plan-noun-card-content.component.html',
  styleUrls: ['./plan-noun-card-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNounCardContentComponent implements OnInit, OnChanges {
  @Input()
  public group: PlanConditionGroup;

  @Input()
  public plan: DecisionTable;

  @Input()
  public editedIndex: number;

  public fieldValues$: Observable<FieldValues>;
  public tasks$: Observable<Task[]>;
  public unitOfMeasure$: Observable<UnitOfMeasure>;

  private nounName$ = new BehaviorSubject('');

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.fieldValues$ = this.store$.pipe(select(selectFieldValues));
    this.tasks$ = this.store$.pipe(select(selectAllTasks));
    this.unitOfMeasure$ = this.nounName$.pipe(
      switchMap(name => this.store$.pipe(select(selectUnitOfMeasureByNounSubcategory(name))))
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.group && this.group && !this.group.global) {
      this.nounName$.next(this.group.name);
    }
  }

  public onAddCondition() {
    this.router.navigate([{editedGroup: this.group.name}], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
    });
  }

  public onCloseEditing() {
    this.router.navigate([{}], {
      queryParamsHandling: 'preserve',
      relativeTo: this.activatedRoute,
    });
  }

  public onEditCondition(editedIndex: number) {
    this.router.navigate([{editedGroup: this.group.name, editedIndex}], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
    });
  }

  public onDeleteCondition(index: number) {
    if (this.group.global) {
      this.deleteFact(index);
    } else {
      this.deleteRule(index);
    }
  }

  private deleteFact(index: number) {
    const facts = [...this.plan.facts];
    facts.splice(index, 1);

    const decisionTable = {...this.plan, facts};
    this.updateDecisionTable(decisionTable);
  }

  private deleteRule(index: number) {
    const rules = [...this.plan.rules];
    rules.splice(index, 1);

    const decisionTable = {...this.plan, rules};
    this.updateDecisionTable(decisionTable);
  }

  public onPlanChange(decisionTable: DecisionTable) {
    this.updateDecisionTable(decisionTable);
  }

  private updateDecisionTable(decisionTable: DecisionTable) {
    this.store$.dispatch(
      new UpdateDecisionTableAction({
        decisionTable,
        onSuccess: () => this.onCloseEditing(),
      })
    );
  }

  trackByName(index: number, f: ConditionDisplay): string {
    return f.name;
  }
}
