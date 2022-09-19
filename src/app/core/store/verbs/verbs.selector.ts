import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {verbsAdapter} from './verbs.state';

export const selectVerbsState = (state: AppState) => state.verbs;

export const selectAllVerbs = createSelector(selectVerbsState, verbsAdapter.getSelectors().selectAll);

export const selectVerbsMap = createSelector(selectVerbsState, verbsAdapter.getSelectors().selectEntities);

export const selectVerbsLoaded = createSelector(selectVerbsState, state => state.loaded);
