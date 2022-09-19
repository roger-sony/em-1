import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {taskRuleTriggersAdapter} from './task-rule-triggers.state';
import {selectRouterQueryParam} from '../router/router.selector';

export const selectTaskRuleTriggersState = (state: AppState) => state.taskRuleTriggers;

export const selectAllTaskRuleTriggers = createSelector(
  selectTaskRuleTriggersState,
  taskRuleTriggersAdapter.getSelectors().selectAll
);

export const selectTaskRuleTriggersMap = createSelector(
  selectTaskRuleTriggersState,
  taskRuleTriggersAdapter.getSelectors().selectEntities
);

export const selectTaskRuleTriggerById = (id: string) =>
  createSelector(selectTaskRuleTriggersMap, taskRuleTriggersMap => taskRuleTriggersMap[id]);

export const selectFilteredTaskRuleTriggers = createSelector(
  selectAllTaskRuleTriggers,
  selectRouterQueryParam('search'),
  (taskRuleTriggers, searchQueryParam) => {
    return taskRuleTriggers.filter(n => n.displayName?.toLowerCase().includes((searchQueryParam || '').toLowerCase()));
  }
);

export const selectTaskRuleTriggersLoaded = createSelector(selectTaskRuleTriggersState, state => state.loaded);

export const selectTaskRuleTriggersLoading = createSelector(selectTaskRuleTriggersLoaded, loaded => !loaded);
