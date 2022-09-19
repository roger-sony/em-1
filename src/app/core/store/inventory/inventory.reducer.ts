import {InventoryAction, InventoryActionType} from './inventory.action';
import {initialInventoryState, inventoryAdapter, InventoryState} from './inventory.state';

export function inventoryReducer(
  state: InventoryState = initialInventoryState,
  action: InventoryAction
): InventoryState {
  switch (action.type) {
    case InventoryActionType.GET_ALL_ITEMS_SUCCESS:
      return inventoryAdapter.setAll(action.payload.inventoryItems, state);
    case InventoryActionType.GET_ABSTRACT_NOUNS_SUCCESS:
      return {...state, abstractNouns: action.payload.abstractNouns};
    case InventoryActionType.GET_ALL_FIELD_VALUES_SUCCESS:
      return {...state, fieldValues: action.payload.fieldValues};
    case InventoryActionType.GET_SUBCATEGORY_FIELD_VALUES_SUCCESS:
      const subcategoryFieldValuesMap = {
        ...state.subcategoryFieldValuesMap,
        [action.payload.subcategory]: action.payload.fieldValues,
      };
      return {...state, subcategoryFieldValuesMap};
    case InventoryActionType.ADD_TO_CHAPTER_SUCCESS:
    case InventoryActionType.REMOVE_FROM_CHAPTER_SUCCESS:
      return inventoryAdapter.upsertOne(action.payload.inventoryItem, state);
    case InventoryActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case InventoryActionType.CLEAR:
      return initialInventoryState;
    default:
      return state;
  }
}
