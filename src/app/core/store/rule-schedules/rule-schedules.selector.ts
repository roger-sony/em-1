import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {ruleSchedulesAdapter} from './rule-schedules.state';

export const selectRuleSchedulesState = (state: AppState) => state.ruleSchedules;

export const selectAllRuleSchedules = createSelector(
  selectRuleSchedulesState,
  ruleSchedulesAdapter.getSelectors().selectAll
);

export const selectRuleSchedulesMap = createSelector(
  selectRuleSchedulesState,
  ruleSchedulesAdapter.getSelectors().selectEntities
);

export const selectRuleScheduleById = (id: string) =>
  createSelector(selectRuleSchedulesMap, ruleSchedulesMap => ruleSchedulesMap[id]);

export const selectRuleSchedulesLoaded = createSelector(selectRuleSchedulesState, state => state.loaded);

export const selectRuleSchedulesLoading = createSelector(selectRuleSchedulesLoaded, loaded => !loaded);
