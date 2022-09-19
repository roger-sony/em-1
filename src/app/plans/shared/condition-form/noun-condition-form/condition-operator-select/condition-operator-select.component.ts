import {Component, ChangeDetectionStrategy, Input, SimpleChanges, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {getInventoryFieldOperators} from 'src/app/shared/utils/inventory/get-inventory-field-operators';

@Component({
  selector: 'condition-operator-select',
  templateUrl: './condition-operator-select.component.html',
  styleUrls: ['./condition-operator-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionOperatorSelectComponent implements OnChanges {
  @Input()
  public value: string;

  @Input()
  public nounName: string;

  @Input()
  public attributeName: string;

  @Input()
  public unitOfMeasure: UnitOfMeasure[];

  @Output()
  public valueChange = new EventEmitter<string>();

  public operators: string[] = [];

  public operatorSelect = new FormControl('');

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.value && this.value) {
      this.operatorSelect.setValue(this.value);
    }
    if (changes.attributeName && this.attributeName) {
      this.createOperatorsAndSetDefaultValue();
    }
    if (changes.unitOfMeasure && this.unitOfMeasure) {
      this.createOperatorsAndSetDefaultValue();
    }
  }

  private createOperatorsAndSetDefaultValue() {
    const filteredUOM = this.unitOfMeasure?.find(uom => uom.nounSubcategory === this.nounName);
    const anyNounType = this.nounName === 'Any Noun' ? 'number' : null;
    this.operators = getInventoryFieldOperators(this.attributeName, anyNounType || filteredUOM?.type);
  }

  public onOperatorChange(value: string) {
    this.valueChange.emit(value);
  }
}
