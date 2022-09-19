import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {UnitOfMeasure} from '../../../../core/model/unit-of-measure';
import {getInventoryFieldOperators} from '../../../../shared/utils/inventory/get-inventory-field-operators';

@Component({
  selector: 'rule-operator-select',
  templateUrl: './rule-operator-select.component.html',
  styleUrls: ['./rule-operator-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleOperatorSelectComponent implements OnChanges {
  @Input()
  public attributeName: string;

  @Input()
  public control: AbstractControl;

  @Input()
  public unitOfMeasure: UnitOfMeasure;

  public operators: string[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.attributeName && this.attributeName) {
      this.createOperatorsAndSetDefaultValue();
    }
    if (changes.unitOfMeasure && this.unitOfMeasure) {
      this.createOperatorsAndSetDefaultValue();
    }
  }

  private createOperatorsAndSetDefaultValue() {
    this.operators = getInventoryFieldOperators(this.attributeName, this.unitOfMeasure?.type);

    if (this.operators.length === 1 && !this.control.value) {
      this.control.setValue(this.operators[0]);
    }
  }
}
