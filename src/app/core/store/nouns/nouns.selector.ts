import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {nounsAdapter} from './nouns.state';
import {selectSearchParams} from '../router/router.selector';
import {
  filterLexiconNounsBySearchParamsPagination,
  filterLexiconNounsTableBySearchParams,
} from '../../../shared/utils/lexicon/lexicon-nouns.helper';

export const selectNounsState = (state: AppState) => state.nouns;

export const selectCustomRouterState = (state: AppState) => state.router;
export const selectRouterState = createSelector(selectCustomRouterState, state => state && state.state);
export const selectRouterQueryParams = createSelector(selectRouterState, state => (state && state.queryParams) || {});

export const selectAllNouns = createSelector(selectNounsState, nounsAdapter.getSelectors().selectAll);

export const selectNounsLoaded = createSelector(selectNounsState, state => state.loaded);

export const selectFilteredNouns = createSelector(selectNounsState, nounsAdapter.getSelectors().selectAll);

export const selectFilteredNounsTable = createSelector(selectAllNouns, selectRouterQueryParams, (nouns, queryParam) => {
  return filterLexiconNounsTableBySearchParams(nouns, queryParam);
});

export const selectFilteredNounsPagination = createSelector(
  selectAllNouns,
  selectSearchParams,
  selectRouterQueryParams,
  (nouns, searchParams, queryParams) => {
    return filterLexiconNounsBySearchParamsPagination(nouns, searchParams, queryParams);
  }
);

export const selectDisplayedColumns = createSelector(selectNounsState, state => state.displayedColumns);

export const selectPossibleColumns = createSelector(selectNounsState, state => state.possibleColumns);
