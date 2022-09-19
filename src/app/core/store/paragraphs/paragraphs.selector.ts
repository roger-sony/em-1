import {createSelector} from '@ngrx/store';
import {selectSearchParams} from 'src/app/core/store/router/router.selector';
import {
  filterParagraphsBySearchParams,
  filterParagraphsByPagination,
} from 'src/app/shared/utils/paragraphs/filter-paragraphs-by-search-params';
import {AppState} from '../app-state';
import {selectRouterQueryParams} from './../nouns/nouns.selector';
import {paragraphsAdapter} from './paragraphs.state';

export const selectParagraphsState = (state: AppState) => state.paragraphs;

export const selectAllParagraphs = createSelector(selectParagraphsState, paragraphsAdapter.getSelectors().selectAll);

export const selectAllParagraphsCount = createSelector(selectParagraphsState, state => state.paragraphsCount);

export const selectParagraphsLoaded = createSelector(selectParagraphsState, state => state.loaded);

export const selectParagraphsLoading = createSelector(selectParagraphsLoaded, loaded => !loaded);

export const selectFilteredParagraphs = createSelector(
  selectAllParagraphs,
  selectSearchParams,
  (paragraphs, searchParams) => filterParagraphsBySearchParams(paragraphs, searchParams)
);

export const selectFilteredParagraphsPagination = createSelector(
  selectAllParagraphs,
  selectSearchParams,
  selectRouterQueryParams,
  (paragraphs, searchParams, queryParams) => filterParagraphsByPagination(paragraphs, searchParams, queryParams)
);

export const selectParagraphsMap = createSelector(
  selectParagraphsState,
  paragraphsAdapter.getSelectors().selectEntities
);

export const selectParagraphById = (id: string) =>
  createSelector(selectParagraphsMap, paragraphsMap => paragraphsMap[id]);

export const selectStoredSentences = createSelector(selectParagraphsState, state => state.sentences);
