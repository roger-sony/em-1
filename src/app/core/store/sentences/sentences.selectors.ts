import {sentencesAdapter} from './sentences.state';
import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';

export const selectSentencesState = (state: AppState) => state.sentences;

export const selectAllSentences = createSelector(selectSentencesState, sentencesAdapter.getSelectors().selectAll);

export const selectSentencesMap = createSelector(selectSentencesState, sentencesAdapter.getSelectors().selectEntities);

export const selectSentencesLoaded = createSelector(selectSentencesState, state => state.loaded);
