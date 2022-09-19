import {createSelector} from '@ngrx/store';
import {AppState} from './../app-state';
export const selectAdjectivesState = (state: AppState) => state.adjectives;

export const selectAllAdjectives = createSelector(selectAdjectivesState, state => state.adjectives);

export const selectAdjectivesLoaded = createSelector(selectAdjectivesState, state => state.loaded);

export const selectAdjectivesMap = createSelector(selectAdjectivesState, state => state.adjectivesMap);
