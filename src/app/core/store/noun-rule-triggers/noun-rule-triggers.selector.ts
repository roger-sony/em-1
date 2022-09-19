import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {nounRuleTriggersAdapter} from './noun-rule-triggers.state';
import {selectRouterQueryParam} from '../router/router.selector';

export const selectNounRuleTriggersState = (state: AppState) => state.nounRuleTriggers;

export const selectAllNounRuleTriggers = createSelector(
  selectNounRuleTriggersState,
  nounRuleTriggersAdapter.getSelectors().selectAll
);

export const selectNounRuleTriggersMap = createSelector(
  selectNounRuleTriggersState,
  nounRuleTriggersAdapter.getSelectors().selectEntities
);

export const selectNounRuleTriggerById = (id: string) =>
  createSelector(selectNounRuleTriggersMap, nounRuleTriggersMap => nounRuleTriggersMap[id]);

export const selectFilteredNounRuleTriggers = createSelector(
  selectAllNounRuleTriggers,
  selectRouterQueryParam('search'),
  (nounRuleTriggers, searchQueryParam) => {
    return nounRuleTriggers.filter(n => n.displayName?.toLowerCase().includes((searchQueryParam || '').toLowerCase()));
  }
);

export const selectNounRuleTriggersLoaded = createSelector(selectNounRuleTriggersState, state => state.loaded);

export const selectNounRuleTriggersLoading = createSelector(selectNounRuleTriggersLoaded, loaded => !loaded);
