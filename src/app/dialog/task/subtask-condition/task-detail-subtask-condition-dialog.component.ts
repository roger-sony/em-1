import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {FactFilter} from 'src/app/core/model/fact-filter';
import {FieldValues} from 'src/app/core/model/field-values';
import {InventoryItem} from 'src/app/core/model/inventory-item';
import {selectAllInventoryItems, selectFieldValues} from 'src/app/core/store/inventory/inventory.selector';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {UpdateFactsAction} from 'src/app/core/store/tasks/tasks.action';
import {selectStoredFacts} from 'src/app/core/store/tasks/tasks.selector';

@Component({
  selector: 'task-detail-subtask-condition-dialog',
  templateUrl: './task-detail-subtask-condition-dialog.component.html',
  styleUrls: ['./task-detail-subtask-condition-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailSubtaskConditionDialogComponent implements OnInit {
  public factIndex$: Observable<string>;
  public storedFacts$: Observable<FactFilter[]>;
  public fact$: Observable<FactFilter>;
  public inventoryFieldValues$: Observable<FieldValues>;
  public inventoryFieldNames$: Observable<string[]>;
  public nouns$: Observable<InventoryItem[]>;
  public filteredNouns$: Observable<InventoryItem[]>;

  public nounInput$ = new BehaviorSubject<string>('');
  public factForm$ = new BehaviorSubject<FactFilter>(null);

  public valid$ = new BehaviorSubject<boolean>(false);

  constructor(
    private dialog: MatDialogRef<TaskDetailSubtaskConditionDialogComponent>,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.factIndex$ = this.store$.pipe(select(selectRouterParam('factIndex')));
    this.storedFacts$ = this.store$.pipe(select(selectStoredFacts));
    this.inventoryFieldValues$ = this.store$.pipe(select(selectFieldValues));
    this.nouns$ = this.store$.pipe(select(selectAllInventoryItems));
    this.inventoryFieldNames$ = this.observeInventoryFieldValues();
    this.filteredNouns$ = this.observeNounInput();

    this.fact$ = this.observeFactIndex();
  }

  public observeFactIndex(): Observable<FactFilter> {
    return combineLatest([this.factIndex$, this.storedFacts$]).pipe(
      map(([index, facts]) => {
        if (index && index !== 'new' && facts?.length) {
          this.valid$.next(true);
          const fact = {...facts[Number(index)]};
          fact['filterValue'] = fact['value'];
          delete fact['value'];
          return fact;
        }
      })
    );
  }

  private observeInventoryFieldValues(): Observable<string[]> {
    return this.inventoryFieldValues$.pipe(
      map(values => {
        if (values && Object.keys(values).length) {
          const fieldNames = Object.keys(values) || [];
          fieldNames.push('expiry_date', '_last_updated', 'qty');
          return fieldNames.filter(i => i !== '_trigger' && i !== 'unit_of_measure' && i !== 'subcategory');
        }
      })
    );
  }

  private observeNounInput(): Observable<InventoryItem[]> {
    return combineLatest([this.nouns$, this.nounInput$]).pipe(
      map(([nouns, input]) => nouns.filter(noun => noun.displayName.toLowerCase().includes(input.toLowerCase())) || [])
    );
  }

  public onValueChanges(value: FactFilter) {
    this.factForm$.next(value);
    if (!value.name || !value.operation || !value.filterValue) {
      return this.valid$.next(false);
    }
    return this.valid$.next(true);
  }

  public onSave() {
    combineLatest([this.factForm$, this.storedFacts$, this.factIndex$])
      .pipe(take(1))
      .subscribe(([factForm, storedFacts, index]) => {
        const facts = storedFacts ? [...storedFacts] : [];
        if (index === 'new') {
          facts.push(this.changeFactFilterName(factForm));
        } else {
          facts.splice(Number(index), 1, this.changeFactFilterName(factForm));
        }
        this.store$.dispatch(new UpdateFactsAction({facts}));
        this.router.navigate([], {queryParams: {edited: true}});
        this.dialog.close();
      });
  }

  private changeFactFilterName(fact: FactFilter): FactFilter {
    fact['value'] = fact['filterValue'];
    delete fact['filterValue'];
    return fact;
  }
}
