import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {selectRouterQueryParam} from '../router/router.selector';
import {inventoryAdapter} from './inventory.state';

export const selectInventoryState = (state: AppState) => state.inventory;

export const selectAllInventoryItems = createSelector(selectInventoryState, inventoryAdapter.getSelectors().selectAll);

export const selectInventoryItemsMap = createSelector(
  selectInventoryState,
  inventoryAdapter.getSelectors().selectEntities
);

export const selectInventoryItemById = (id: string) =>
  createSelector(selectInventoryItemsMap, inventoryItemsMap => inventoryItemsMap[id]);

export const selectInventoryItemByDisplayName = (displayName: string) =>
  createSelector(selectAllInventoryItems, items => items.find(item => item.displayName === displayName));

export const selectInventoryItemBySubcategory = (subcategory: string) =>
  createSelector(selectAllInventoryItems, items => items.find(item => item.subcategory === subcategory));

export const selectInventoryItemsByChapter = (chapterId: string) =>
  createSelector(selectAllInventoryItems, inventoryItems =>
    inventoryItems.filter(item => item.chapterIds?.includes(chapterId))
  );

export const selectInventoryItemsLoaded = createSelector(selectInventoryState, state => state.loaded);
export const selectInventoryItemsLoading = createSelector(selectInventoryItemsLoaded, loaded => !loaded);

export const selectAbstractNounNames = createSelector(selectInventoryState, state => state.abstractNouns);

export const selectFieldValues = createSelector(selectInventoryState, state => state.fieldValues);

export const selectSubcategoryFieldValuesMap = createSelector(
  selectInventoryState,
  state => state.subcategoryFieldValuesMap
);

export const selectFilteredNouns = createSelector(
  selectAllInventoryItems,
  selectRouterQueryParam('search'),
  (nouns, searchQueryParam) => {
    return nouns.filter(n => n.subcategory?.toLowerCase().includes((searchQueryParam || '').toLowerCase()));
  }
);

export const selectSubcategoryFieldValues = (subcategory: string) =>
  createSelector(selectSubcategoryFieldValuesMap, subcategoryFieldValuesMap => subcategoryFieldValuesMap[subcategory]);
