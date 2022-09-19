import {NounRuleTriggersAction, NounRuleTriggersActionType} from './noun-rule-triggers.action';
import {initialNounRuleTriggersState, nounRuleTriggersAdapter, NounRuleTriggersState} from './noun-rule-triggers.state';

export function nounRuleTriggersReducer(
  state: NounRuleTriggersState = initialNounRuleTriggersState,
  action: NounRuleTriggersAction
): NounRuleTriggersState {
  switch (action.type) {
    case NounRuleTriggersActionType.GET_ALL_SUCCESS:
      return nounRuleTriggersAdapter.setAll(action.payload.triggers, state);
    case NounRuleTriggersActionType.GET_SINGLE_SUCCESS:
      return nounRuleTriggersAdapter.upsertOne(action.payload.trigger, state);
    case NounRuleTriggersActionType.CREATE_SUCCESS:
      return nounRuleTriggersAdapter.addOne(action.payload.trigger, state);
    case NounRuleTriggersActionType.DELETE_SUCCESS:
      return nounRuleTriggersAdapter.removeOne(action.payload.id, state);
    case NounRuleTriggersActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case NounRuleTriggersActionType.CLEAR:
      return initialNounRuleTriggersState;
    default:
      return state;
  }
}
