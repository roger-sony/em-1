import {Pipe, PipeTransform} from '@angular/core';
import {getInventoryFieldOperators} from '../../utils/inventory/get-inventory-field-operators';

@Pipe({
  name: 'inventoryFieldOperators',
})
export class InventoryFieldOperatorsPipe implements PipeTransform {
  public transform(field: string, type?: string): string[] {
    return getInventoryFieldOperators(field, type);
  }
}
