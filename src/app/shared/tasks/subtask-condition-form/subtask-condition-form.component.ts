import {UnitOfMeasure} from './../../../core/model/unit-of-measure';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {FactFilter} from 'src/app/core/model/fact-filter';
import {FieldValues} from 'src/app/core/model/field-values';
import {getInventoryFieldOperators} from '../../utils/inventory/get-inventory-field-operators';
import {InventoryItem} from './../../../core/model/inventory-item';

@Component({
  selector: 'subtask-condition-form',
  templateUrl: './subtask-condition-form.component.html',
  styleUrls: ['./subtask-condition-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtaskConditionFormComponent implements OnChanges {
  @Input()
  public formValue: FactFilter;

  @Input()
  public fieldNames: string[];

  @Input()
  public fieldValues: FieldValues;

  @Input()
  public currentNoun: InventoryItem;

  @Input()
  public currentUnitOfMeasure: UnitOfMeasure;

  @Output()
  public valueChanges = new EventEmitter<FactFilter>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  public filteredFieldValues: string[];

  public operators$ = new BehaviorSubject<string[]>([]);
  public valueInput$ = new BehaviorSubject<string>('');

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    operation: new FormControl({value: '', disabled: true}, Validators.required),
    filterValue: new FormControl({value: '', disabled: true}, Validators.required),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formValue && this.formValue) {
      this.fillInForm();
    }
    if (changes.currentNoun && this.currentNoun) {
      this.findInventoryFieldOperators();
      this.findFilteredFieldValues();
    }
  }

  private fillInForm() {
    this.form.setValue({
      name: this.formValue.name || '',
      operation: this.formValue.operation || '',
      filterValue: this.formValue.filterValue || '',
    });
    this.findInventoryFieldOperators();
    this.findFilteredFieldValues();
  }

  private findInventoryFieldOperators() {
    const operatorType = this.currentNoun?.type === 'abstract' ? '' : 'number';
    this.operators$.next(getInventoryFieldOperators(this.formValue?.name, operatorType));
  }

  public onNameChange(value: string) {
    this.form.controls.operation.enable();
    this.form.controls.filterValue.enable();
    this.form.patchValue({operation: '$eq', filterValue: ''});
    this.findFilteredFieldValues();
    this.valueChanges.emit(this.form.value);
    this.validityChange.emit(this.form.valid);
  }

  private findFilteredFieldValues() {
    if (this.currentNoun?.type === 'abstract' && this.form.value.name === 'qty' && this.currentUnitOfMeasure) {
      this.filteredFieldValues = this.currentUnitOfMeasure.rangeConfig.map(option => option.displayValue);
    } else {
      this.filteredFieldValues = this.findFieldValues('');
    }
  }

  public onOperationChange(value: string) {
    this.valueChanges.emit(this.form.value);
    this.validityChange.emit(this.form.valid);
  }

  public onInput(value: string) {
    this.filteredFieldValues = this.findFieldValues(value);
    this.valueChanges.emit(this.form.value);
  }

  public findFieldValues(value: string): string[] {
    return this.fieldValues[this.form.value.name]?.filter((item: string) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
  }

  public onValueSelection(value: string) {
    this.valueChanges.emit(this.form.value);
    this.validityChange.emit(this.form.valid);
  }
}
