import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subtask, Task} from 'src/app/core/model/task';
import {parseDurationMinutes} from '../../utils/date/parse-duration-minutes';
import {Subscription} from 'rxjs';
import {FieldValues} from 'src/app/core/model/field-values';
import {AutocompleteNounFilterService} from '../../../services/autocomplete-noun-filter.service';
import {InventoryService} from 'src/app/core/api/legacy/inventory.service';
import {FormControl} from '@angular/forms';
import {FactFilter} from 'src/app/core/model/fact-filter';

@Component({
  selector: 'subtask-form',
  templateUrl: './subtask-form.component.html',
  styleUrls: ['./subtask-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtaskFormComponent implements OnInit, OnChanges {
  @Input()
  public task: Task;

  @Input()
  public inventoryFieldOptions: FieldValues;

  public universalFilters: string[] = [];
  public inventoryFieldNames: string[];
  public displayedColumns: string[] = [];
  // tslint:disable-next-line:no-any
  public dataSource: any = [];
  public activeFilterOptions: string[];
  public inactiveFilterOptions: string[];

  public universalFilterName = new FormControl('');
  public universalFilterValue = new FormControl('');
  public universalFilterOperation = new FormControl('');

  autocompleteNounFilterSubscription: Subscription;

  @Output()
  public valueChange = new EventEmitter<Task>();

  constructor(
    private autocompleteNounFilterService: AutocompleteNounFilterService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inventoryFieldOptions || changes.task) {
      this.formatInventoryFieldOptions();
    }
  }

  public onVerbChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    this.task.subtasks[index].verb = input.value;

    this.valueChange.emit(this.task);
  }

  public onNounSubcategoryChange(value: string, index: number) {
    this.task.subtasks[index].configName = value;

    this.valueChange.emit(this.task);
  }

  public onValueInput(event: Event, element: Subtask) {
    const input = event.target as HTMLInputElement;
    element.filterValue = input.value;
  }

  public onOperationValueChange(value: string, element: Subtask) {
    element.filterOperation = value;
  }

  public onNounAutocompleteChange(value: string, element: Subtask, index: number) {
    if (value && index >= 0) {
      element.filterValue = value;
    }
    if (this.activeFilterOptions && this.inactiveFilterOptions && value) {
      element.activeOptions = this.activeFilterOptions.filter((option: string) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      element.inactiveOptions = this.inactiveFilterOptions.filter((option: string) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  public formatInventoryFieldOptions() {
    if (this.task && this.inventoryFieldOptions) {
      this.inventoryFieldNames = Object.keys(this.inventoryFieldOptions);
      this.inventoryFieldNames.push('expiry_date', '_last_updated', 'qty');
      this.inventoryFieldNames = this.inventoryFieldNames.filter(
        i => i !== '_trigger' && i !== 'unit_of_measure' && i !== 'subcategory'
      );
      this.initializeSubtaskTable();
    }
  }

  initializeSubtaskTable(): void {
    this.displayedColumns = ['verb', 'noun', 'filters', 'delete_subtask'];
    this.dataSource = new MatTableDataSource(this.task.subtasks);
  }

  handleSelect(): void {
    this.universalFilterValue.setValue('');
    // Only some fields can use > or < comparators. Most should default to =
    const comparableFields = ['qty', 'expiry_date', 'last_updated'];
    const fieldIsComparable = comparableFields.includes(this.universalFilterName.value);
    this.universalFilterOperation.setValue(fieldIsComparable ? '' : '$eq');
  }

  public addFilterToSubtask(subtask: Subtask) {
    if (!subtask.factFilters) {
      subtask.factFilters = [];
    }
    subtask.factFilters.push({
      name: subtask.filterName,
      operation: subtask.filterOperation,
      value: subtask.filterValue.toString(),
    });
    subtask.filterName = '';
    subtask.filterOperation = '';
    subtask.filterValue = '';

    this.valueChange.emit(this.task);
  }

  deleteFilterFromSubtask(factFilter: FactFilter, subtask: Subtask): void {
    subtask.factFilters = subtask.factFilters.filter((f: FactFilter) => f !== factFilter);

    this.valueChange.emit(this.task);
  }

  deleteSubtask(subtask: Subtask): void {
    if (confirm(`Are you sure you want to delete this subtask?`)) {
      this.task.subtasks = this.task.subtasks.filter((s: Subtask) => s !== subtask);
      this.initializeSubtaskTable();
      this.valueChange.emit(this.task);
    }
  }

  addSubtask(): void {
    if (!this.task.subtasks) {
      this.task.subtasks = [];
    }
    this.task.subtasks.push({verb: '', configName: '', factFilters: []});
    // this.subtasks.setValue()
    this.initializeSubtaskTable();
  }

  public onUniversalFilterLastUpdatedBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.value = String(parseDurationMinutes(input.value));
    this.universalFilterValue.setValue(input.value);
  }

  public onSubtaskFilterLastUpdatedBlur(event: FocusEvent, element: Subtask) {
    const input = event.target as HTMLInputElement;
    input.value = String(parseDurationMinutes(input.value));
    element.filterValue = input.value;
  }

  public addUniversalFilter(): void {
    if (!this.task.facts) {
      this.task.facts = [];
    }
    this.task['facts'].push({
      name: this.universalFilterName.value,
      operation: this.universalFilterOperation.value,
      value: this.universalFilterValue.value.toString(),
    });
    this.universalFilterName.setValue('');
    this.universalFilterOperation.setValue('');
    this.universalFilterValue.setValue('');

    this.valueChange.emit(this.task);
  }

  deleteUniversalFilter(universalFilter: FactFilter): void {
    this.task.facts = this.task.facts.filter((f: FactFilter) => f !== universalFilter);
  }

  handleSelectTable(value: string, selection: Subtask, index: number): void {
    this.autocompleteNounFilterService.changeMessage({input: null, index: index});
    selection.filterValue = '';
    selection.filterName = value;
    if (this.task.subtasks[index].configName) {
      this.getSubcategoryFields(index, selection.filterName);
    }
    switch (selection.filterName) {
      case 'expiry_date':
        selection.filterOperation = '';
        break;
      case '_last_updated':
        selection.filterOperation = '';
        break;
      default:
        selection.filterOperation = '$eq';
    }
  }

  getSubcategoryFields(index: number, filterName: string): void {
    if (filterName === 'qty' || filterName === '_last_updated' || filterName === 'expiry_date') {
      this.task.subtasks[index].activeOptions = [];
      this.task.subtasks[index].inactiveOptions = [];
      return;
    }
    this.inventoryService.getFieldValuesForSubcategory(this.task.subtasks[index].configName).subscribe(i => {
      this.task.subtasks[index].activeOptions = i.active[filterName];
      this.task.subtasks[index].inactiveOptions = i.inactive[filterName];
      this.activeFilterOptions = [...i.active[filterName]] || [];
      this.inactiveFilterOptions = [...i.inactive[filterName]] || [];
    });
  }

  public onAutocompleteValueChange(value: string) {
    this.universalFilterValue.setValue(value);
  }
}
