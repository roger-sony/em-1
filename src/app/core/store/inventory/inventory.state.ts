import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {FieldValues, SubcategoryFieldValues} from '../../model/field-values';
import {InventoryItem} from '../../model/inventory-item';

export interface InventoryState extends EntityState<InventoryItem> {
  abstractNouns: string[];
  fieldValues: FieldValues;
  loaded: boolean;
  subcategoryFieldValuesMap: Record<string, SubcategoryFieldValues>;
}

export const inventoryAdapter = createEntityAdapter<InventoryItem>();

export const initialInventoryState: InventoryState = inventoryAdapter.getInitialState({
  abstractNouns: [],
  fieldValues: null,
  loaded: false,
  subcategoryFieldValuesMap: {},
});
