import {RuleSchedulesAction, RuleSchedulesActionType} from './rule-schedules.action';
import {initialRuleSchedulesState, ruleSchedulesAdapter, RuleSchedulesState} from './rule-schedules.state';

export function ruleSchedulesReducer(
  state: RuleSchedulesState = initialRuleSchedulesState,
  action: RuleSchedulesAction
): RuleSchedulesState {
  switch (action.type) {
    case RuleSchedulesActionType.GET_ALL_SUCCESS:
      return ruleSchedulesAdapter.setAll(action.payload.ruleSchedules, state);
    case RuleSchedulesActionType.GET_SINGLE_SUCCESS:
      return ruleSchedulesAdapter.upsertOne(action.payload.ruleSchedule, state);
    case RuleSchedulesActionType.CREATE_SUCCESS:
      return ruleSchedulesAdapter.addOne(action.payload.ruleSchedule, state);
    case RuleSchedulesActionType.DELETE_SUCCESS:
      return ruleSchedulesAdapter.removeOne(action.payload.id, state);
    case RuleSchedulesActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case RuleSchedulesActionType.CLEAR:
      return initialRuleSchedulesState;
    default:
      return state;
  }
}
