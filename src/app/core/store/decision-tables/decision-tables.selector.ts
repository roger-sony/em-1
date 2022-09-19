import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {selectRouterParam, selectRouterQueryParam, selectSearchParams} from '../router/router.selector';
import {decisionTablesAdapter} from './decision-tables.state';
import {filterPlansBySearchParamsGetCounts} from '../../../shared/utils/plans/filter-plans-by-search-params';

import {selectAllNounRuleTriggers} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectAllTaskRuleTriggers} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.selector';
import {selectAllRuleSchedules} from 'src/app/core/store/rule-schedules/rule-schedules.selector';

export const selectDecisionTablesState = (state: AppState) => state.decisionTables;

export const selectAllDecisionTables = createSelector(
  selectDecisionTablesState,
  decisionTablesAdapter.getSelectors().selectAll
);

export const selectDecisionTablesMap = createSelector(
  selectDecisionTablesState,
  decisionTablesAdapter.getSelectors().selectEntities
);

export const selectDecisionTableById = (id: string) =>
  createSelector(selectDecisionTablesMap, decisionTablesMap => decisionTablesMap[id]);

export const selectDecisionTablesByChapter = (chapterId: string) =>
  createSelector(selectAllDecisionTables, decisionTables =>
    decisionTables.filter(decisionTable => decisionTable.chapterIds?.includes(chapterId))
  );

export const selectDecisionTableByIdFromUrl = createSelector(
  selectDecisionTablesMap,
  selectRouterParam('planId'),
  (decisionTablesMap, id) => decisionTablesMap[id]
);

// Doesn't include conditionCount, triggerCount, nounCount, or cadencesLength in DTO
// export const selectFilteredDecisionTables = createSelector(
//   selectAllDecisionTables,
//   selectSearchParams,
//   (plans, searchParams) => filterPlansBySearchParams(plans, searchParams) // filterPlansBySearchParams must be included on line 5
// );

export const selectFilteredDecisionTables = createSelector(
  selectAllDecisionTables,
  selectSearchParams,
  selectAllNounRuleTriggers,
  selectAllTaskRuleTriggers,
  selectAllRuleSchedules,
  (plans, searchParams, nounTriggers, taskTriggers, ruleSchedules) =>
    filterPlansBySearchParamsGetCounts(plans, searchParams, nounTriggers, taskTriggers, ruleSchedules)
);

export const selectDecisionTablesBySearchFromUrl = createSelector(
  selectAllDecisionTables,
  selectRouterQueryParam('search'),
  (decisionTables, search) => {
    if (!search) {
      return decisionTables;
    }

    return decisionTables.filter(plan => plan.displayName.toLowerCase().includes(search.toLowerCase()));
  }
);

export const selectDecisionTablesLoaded = createSelector(selectDecisionTablesState, state => state.loaded);

export const selectDecisionTablesLoading = createSelector(selectDecisionTablesLoaded, loaded => !loaded);

export const selectDecisionTablePreviews = createSelector(selectDecisionTablesState, state => state.previews);
export const selectDecisionTablePreview = (id: string) =>
  createSelector(selectDecisionTablePreviews, previews => previews[id]);
