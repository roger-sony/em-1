import {Pipe, PipeTransform} from '@angular/core';
import {InventoryFieldOperator} from '../../../core/model/inventory-field-operator';

@Pipe({
  name: 'inventoryFieldOperatorName',
})
export class InventoryFieldOperatorNamePipe implements PipeTransform {
  public transform(operator: string): string {
    switch (operator) {
      case InventoryFieldOperator.Equal:
        return 'is';
      case InventoryFieldOperator.GreaterThan:
        return 'is more than';
      case InventoryFieldOperator.LessThan:
        return 'is less than';
      default:
        return '';
    }
  }
}
