import {DecisionTablesAction, DecisionTablesActionType} from './decision-tables.action';
import {decisionTablesAdapter, DecisionTablesState, initialDecisionTablesState} from './decision-tables.state';

export function decisionTablesReducer(
  state: DecisionTablesState = initialDecisionTablesState,
  action: DecisionTablesAction
): DecisionTablesState {
  switch (action.type) {
    case DecisionTablesActionType.GET_ALL_SUCCESS:
      return decisionTablesAdapter.setAll(action.payload.decisionTables, state);
    case DecisionTablesActionType.GET_SINGLE_SUCCESS:
      return decisionTablesAdapter.upsertOne(action.payload.decisionTable, state);
    case DecisionTablesActionType.GET_PREVIEW_SUCCESS:
      const previews = {...state.previews, [action.payload.preview.decisionTableId]: action.payload.preview};
      return {...state, previews};
    case DecisionTablesActionType.CREATE_SUCCESS:
      return decisionTablesAdapter.addOne(action.payload.decisionTable, state);
    case DecisionTablesActionType.UPDATE_SUCCESS:
      return decisionTablesAdapter.upsertOne(action.payload.decisionTable, state);
    case DecisionTablesActionType.DELETE_SUCCESS:
      return decisionTablesAdapter.removeOne(action.payload.id, state);
    case DecisionTablesActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case DecisionTablesActionType.CLEAR:
      return initialDecisionTablesState;
    default:
      return state;
  }
}
