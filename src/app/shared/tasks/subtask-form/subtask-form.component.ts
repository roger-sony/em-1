import {selectAllUnitOfMeasures} from './../../../core/store/unit-of-measures/unit-of-measures.selector';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {FactFilter} from 'src/app/core/model/fact-filter';
import {FieldValues} from 'src/app/core/model/field-values';
import {InventoryItem} from 'src/app/core/model/inventory-item';
import {Subtask} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {selectAllInventoryItems, selectFieldValues} from 'src/app/core/store/inventory/inventory.selector';

@Component({
  selector: 'subtask-form',
  templateUrl: './subtask-form.component.html',
  styleUrls: ['./subtask-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtaskFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public value: Subtask;

  @Output()
  public valueChanges = new EventEmitter<Subtask>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  public form = new FormGroup({
    verb: new FormControl('', Validators.required),
    configName: new FormControl('', Validators.required),
    factFilters: new FormArray([]),
  });

  public inventoryFieldValues$: Observable<FieldValues>;
  public inventoryFieldNames$: Observable<string[]>;
  public unitOfMeasures$: Observable<UnitOfMeasure[]>;
  public allNouns$: Observable<InventoryItem[]>;
  public nouns$: Observable<InventoryItem[]>;
  public nounNames$: Observable<string[]>;
  public filteredNounNames$: Observable<string[]>;
  public currentNoun$: Observable<InventoryItem>;
  public currentUnitOfMeasure$: Observable<UnitOfMeasure>;

  public nounInput$ = new BehaviorSubject<string>('');
  public subtaskConditionValidity$ = new BehaviorSubject<boolean>(true);
  public nounValidity$ = new BehaviorSubject<boolean>(false);
  public currentNounName$ = new BehaviorSubject<string>('');

  private subscription = new Subscription();

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.inventoryFieldValues$ = this.store$.pipe(select(selectFieldValues));
    this.unitOfMeasures$ = this.store$.pipe(select(selectAllUnitOfMeasures));
    this.allNouns$ = this.store$.pipe(select(selectAllInventoryItems));
    this.nouns$ = this.observeAllNouns();
    this.nounNames$ = this.observeNouns();
    this.filteredNounNames$ = this.observeNounInput();
    this.inventoryFieldNames$ = this.observeInventoryFieldValues();
    this.currentNoun$ = this.observeCurrentNounName();
    this.currentUnitOfMeasure$ = this.observeCurrentNoun();

    this.subscription = this.subscribeToFormValueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && this.value) {
      this.fillInForm();
    }
  }

  private subscribeToFormValueChanges(): Subscription {
    return this.form.valueChanges.subscribe(value => {
      this.valueChanges.emit(value);
      this.checkValidation();
    });
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

  private checkValidation() {
    this.validityChange.emit(this.nounValidity$.value && this.subtaskConditionValidity$.value && this.form.valid);
  }

  private observeNounInput(): Observable<string[]> {
    return combineLatest([this.nounNames$, this.nounInput$]).pipe(
      map(([nounNames, input]) => {
        const nouns = nounNames.filter(noun => noun.toLowerCase().includes(input.toLowerCase())) || [];
        this.nounValidity$.next(nouns.some(noun => noun === input));
        this.checkValidation();
        return nouns;
      })
    );
  }

  private observeAllNouns(): Observable<InventoryItem[]> {
    return this.allNouns$.pipe(map(allNouns => allNouns.filter(noun => noun.active)));
  }

  private observeNouns(): Observable<string[]> {
    return this.nouns$.pipe(map(nouns => nouns.map(noun => noun.subcategory)));
  }

  private observeCurrentNounName(): Observable<InventoryItem> {
    return combineLatest([this.nouns$, this.currentNounName$, this.nounValidity$]).pipe(
      map(([nouns, currentNounName, nounValidity]) => {
        if (nounValidity) {
          return nouns.find(noun => noun.subcategory === currentNounName);
        }
        return null;
      })
    );
  }

  private observeCurrentNoun(): Observable<UnitOfMeasure> {
    return combineLatest([this.currentNoun$, this.unitOfMeasures$]).pipe(
      map(([noun, uom]) => {
        if (noun && uom) {
          return uom.find(u => u.nounSubcategory === noun?.subcategory);
        }
      })
    );
  }

  public onNounSelect(value: string) {
    this.currentNounName$.next(value);
    this.nounValidity$.next(true);
    this.checkValidation();
  }

  private fillInForm() {
    this.form.patchValue({
      verb: this.value.verb,
      configName: this.value.configName,
    });

    this.form.setControl('factFilters', this.setExistingFactFilters(this.value.factFilters));
  }

  public setExistingFactFilters(factFilters: FactFilter[]): FormArray {
    const formArray = new FormArray([]);
    factFilters.forEach(fact => {
      formArray.push(
        new FormGroup({
          name: new FormControl(fact.name, Validators.required),
          operation: new FormControl(fact.operation, Validators.required),
          filterValue: new FormControl(fact.value),
        })
      );
    });

    return formArray;
  }

  public onAddCondition() {
    const newConditionGroup = new FormGroup({
      name: new FormControl(''),
      operation: new FormControl(''),
      filterValue: new FormControl(''),
    });

    this.factFilters.insert(this.factFilters.length, newConditionGroup);
    this.subtaskConditionValidity$.next(false);
    this.validityChange.emit(false);
  }

  public onConditionChange(filter: FactFilter, index: number) {
    this.conditionName(index).setValue(filter.name);
    this.conditionOperation(index).setValue(filter.operation);
    this.conditionValue(index).setValue(filter.filterValue);

    this.checkValidity();
  }

  public onDeleteCondition(index: number) {
    this.factFilters.removeAt(index);
    this.checkValidity();
  }

  private checkValidity() {
    const invalid = this.factFilters.value.some((f: FactFilter) => !f.filterValue || !f.name || !f.operation);
    this.subtaskConditionValidity$.next(!invalid);
    this.validityChange.emit(!invalid && this.form.valid);
  }

  public get conditionsControl() {
    return (this.form.get('factFilters') as FormArray).controls;
  }

  public get factFilters(): FormArray {
    return this.form.get('factFilters') as FormArray;
  }

  public conditionName(index: number): FormControl {
    return this.factFilters.at(index).get('name') as FormControl;
  }

  public conditionOperation(index: number): FormControl {
    return this.factFilters.at(index).get('operation') as FormControl;
  }

  public conditionValue(index: number): FormControl {
    return this.factFilters.at(index).get('filterValue') as FormControl;
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public trackByNounName(index: number, noun: string): string {
    return noun;
  }
}
