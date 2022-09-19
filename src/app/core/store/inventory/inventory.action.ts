import {Action} from '@ngrx/store';
import {FieldValues, SubcategoryFieldValues} from '../../model/field-values';
import {InventoryItem} from '../../model/inventory-item';

export enum InventoryActionType {
  GET_ALL_ITEMS = '[Inventory] Get All Items',
  GET_ALL_ITEMS_SUCCESS = '[Inventory] Get All Items :: Success',

  GET_ABSTRACT_NOUNS = '[Inventory] Get Abstract Nouns',
  GET_ABSTRACT_NOUNS_SUCCESS = '[Inventory] Get Abstract Nouns :: Success',

  GET_ALL_FIELD_VALUES = '[Inventory] Get All Field Values',
  GET_ALL_FIELD_VALUES_SUCCESS = '[Inventory] Get All Field Values :: Success',

  GET_SUBCATEGORY_FIELD_VALUES = '[Inventory] Get Subcategory Field Values',
  GET_SUBCATEGORY_FIELD_VALUES_SUCCESS = '[Inventory] Get Subcategory Field Values :: Success',

  DELETE = '[Inventory] Delete',
  DELETE_SUCCESS = '[Inventory] Delete :: Success',

  ADD_TO_CHAPTER = '[Inventory] Add To Chapter',
  ADD_TO_CHAPTER_SUCCESS = '[Inventory] Add To Chapter :: Success',

  REMOVE_FROM_CHAPTER = '[Inventory] Remove From Chapter',
  REMOVE_FROM_CHAPTER_SUCCESS = '[Inventory] Remove From Chapter :: Success',

  SET_LOADED = '[Inventory] Set Loaded',

  CLEAR = '[Inventory] Clear',
}

export class GetAllInventoryItemsAction implements Action {
  public readonly type = InventoryActionType.GET_ALL_ITEMS;

  public constructor(
    public payload: {
      force?: boolean;
      onSuccess?: (inventoryItems: InventoryItem[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllInventoryItemsSuccessAction implements Action {
  public readonly type = InventoryActionType.GET_ALL_ITEMS_SUCCESS;

  public constructor(public payload: {inventoryItems: InventoryItem[]}) {}
}

export class GetAbstractNounsAction implements Action {
  public readonly type = InventoryActionType.GET_ABSTRACT_NOUNS;

  public constructor(
    public payload: {
      onSuccess?: (abstractNouns: string[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAbstractNounsSuccessAction implements Action {
  public readonly type = InventoryActionType.GET_ABSTRACT_NOUNS_SUCCESS;

  public constructor(public payload: {abstractNouns: string[]}) {}
}

export class GetAllFieldValuesAction implements Action {
  public readonly type = InventoryActionType.GET_ALL_FIELD_VALUES;

  public constructor(
    public payload: {
      onSuccess?: (fieldValues: FieldValues) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllFieldValuesSuccessAction implements Action {
  public readonly type = InventoryActionType.GET_ALL_FIELD_VALUES_SUCCESS;

  public constructor(public payload: {fieldValues: FieldValues}) {}
}

export class GetSubcategoryFieldValuesAction implements Action {
  public readonly type = InventoryActionType.GET_SUBCATEGORY_FIELD_VALUES;

  public constructor(
    public payload: {
      subcategory: string;
      onSuccess?: (fieldValues: SubcategoryFieldValues) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetSubcategoryFieldValuesSuccessAction implements Action {
  public readonly type = InventoryActionType.GET_SUBCATEGORY_FIELD_VALUES_SUCCESS;

  public constructor(public payload: {subcategory: string; fieldValues: SubcategoryFieldValues}) {}
}

export class DeleteInventoryItemAction implements Action {
  public readonly type = InventoryActionType.DELETE;

  public constructor(
    public payload: {
      inventoryItemId: string;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteInventoryItemSuccessAction implements Action {
  public readonly type = InventoryActionType.DELETE_SUCCESS;

  public constructor(public payload: {inventoryItemId: string}) {}
}

export class AddInventoryItemToChapterAction implements Action {
  public readonly type = InventoryActionType.ADD_TO_CHAPTER;

  public constructor(
    public payload: {
      inventoryItemId: string;
      chapterId: string;
      onSuccess?: (inventoryItem: InventoryItem) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class AddInventoryItemToChapterSuccessAction implements Action {
  public readonly type = InventoryActionType.ADD_TO_CHAPTER_SUCCESS;

  public constructor(public payload: {inventoryItem: InventoryItem}) {}
}

export class RemoveInventoryItemFromChapterAction implements Action {
  public readonly type = InventoryActionType.REMOVE_FROM_CHAPTER;

  public constructor(
    public payload: {
      inventoryItemId: string;
      chapterId: string;
      onSuccess?: (inventoryItem: InventoryItem) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class RemoveInventoryItemFromChapterSuccessAction implements Action {
  public readonly type = InventoryActionType.REMOVE_FROM_CHAPTER_SUCCESS;

  public constructor(public payload: {inventoryItem: InventoryItem}) {}
}

export class SetInventoryItemsLoadedAction implements Action {
  public readonly type = InventoryActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class ClearInventoryAction implements Action {
  public readonly type = InventoryActionType.CLEAR;
}

export type InventoryAction =
  | GetAllInventoryItemsAction
  | GetAllInventoryItemsSuccessAction
  | GetAbstractNounsAction
  | GetAbstractNounsSuccessAction
  | GetAllFieldValuesAction
  | GetAllFieldValuesSuccessAction
  | GetSubcategoryFieldValuesAction
  | GetSubcategoryFieldValuesSuccessAction
  | DeleteInventoryItemAction
  | DeleteInventoryItemSuccessAction
  | AddInventoryItemToChapterAction
  | AddInventoryItemToChapterSuccessAction
  | RemoveInventoryItemFromChapterAction
  | RemoveInventoryItemFromChapterSuccessAction
  | SetInventoryItemsLoadedAction
  | ClearInventoryAction;
