import {InventoryFieldOperator} from '../../../core/model/inventory-field-operator';

export function getInventoryFieldOperators(field: string, type?: string): string[] {
  if (!field) {
    return [];
  } else if ((field === 'qty' && type === 'number') || field === 'expiry_date' || field === '_last_updated') {
    return [InventoryFieldOperator.Equal, InventoryFieldOperator.LessThan, InventoryFieldOperator.GreaterThan];
  } else {
    return [InventoryFieldOperator.Equal];
  }
}
