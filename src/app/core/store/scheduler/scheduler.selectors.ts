import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';

export const selectSchedulerState = (state: AppState) => state.scheduler;

export const selectSchedulerSkedTemplate = createSelector(selectSchedulerState, state => state.skedTemplates);

export const selectSchedulerCurrentWeek = createSelector(selectSchedulerState, state => state.currentWeek);

export const selectSchedulerCurrentMonth = createSelector(selectSchedulerState, state => state.currentMonth);

export const selectSaveInProgress = createSelector(selectSchedulerState, state => state.saveInProgress);
