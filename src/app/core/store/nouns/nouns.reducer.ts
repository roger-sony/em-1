import {initialNounsState, nounsAdapter, NounsState} from './nouns.state';
import {NounsAction, NounsActionType} from './nouns.action';

export function nounsReducer(state: NounsState = initialNounsState, action: NounsAction): NounsState {
  switch (action.type) {
    case NounsActionType.GET_POSSIBLE_COLUMNS_SUCCESS:
      return {...state, possibleColumns: action.payload.possibleColumns};
    case NounsActionType.UPDATE_DISPLAYED_COLUMNS:
      return {...state, displayedColumns: action.payload.displayedColumns};
    case NounsActionType.GET_SUCCESS:
      return nounsAdapter.setAll(action.payload.nouns, state);
    case NounsActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    default:
      return state;
  }
}
