import {createSelector} from '@ngrx/store';
import {SearchParams} from '../../model/search/search-params';
import {AppState} from '../app-state';

export const selectCustomRouterState = (state: AppState) => state.router;

export const selectRouterNavigationId = createSelector(selectCustomRouterState, state => state && state.navigationId);
export const selectRouterState = createSelector(selectCustomRouterState, state => state && state.state);
export const selectPreviousRouterState = createSelector(selectCustomRouterState, state => state && state.previousState);

export const selectRouterData = createSelector(selectRouterState, state => (state && state.data) || {});
export const selectRouterDataEntry = (key: string) => createSelector(selectRouterData, data => data && data[key]);
const selectRouterParams = createSelector(selectRouterState, state => (state && state.params) || {});
export const selectRouterParam = (key: string) => createSelector(selectRouterParams, params => params && params[key]);
const selectRouterQueryParams = createSelector(selectRouterState, state => (state && state.queryParams) || {});
export const selectRouterQueryParam = (key: string) =>
  createSelector(selectRouterQueryParams, queryParams => queryParams && queryParams[key]);
export const selectRouterUrl = createSelector(selectRouterState, state => state && state.url);

const selectPreviousRouterParams = createSelector(selectPreviousRouterState, state => (state && state.params) || {});
export const selectPreviousRouterParam = (key: string) =>
  createSelector(selectPreviousRouterParams, params => params && params[key]);
export const selectPreviousRouterUrl = createSelector(selectPreviousRouterState, state => state && state.url);

// --- Router Parameters Selectors ---

export const selectSearchParams = createSelector(
  selectRouterQueryParams,
  selectRouterParam('chapterId'),
  (queryParams, chapterId) => {
    const chapterIds = queryParams?.chapters?.split(',') || [];

    return {
      name: queryParams.name || null,
      hideDisabled: queryParams.hideDisabled || null,
      text: queryParams?.search || '',
      chapterIds: chapterId && !chapterIds.includes(chapterId) ? chapterIds.concat(chapterId) : chapterIds,
      empty: Boolean(queryParams?.empty),
      sortField: queryParams?.sortField,
      sortDirection: queryParams?.sortDirection,
    } as SearchParams;
  }
);
