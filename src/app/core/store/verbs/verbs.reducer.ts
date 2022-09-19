import {VerbsAction, VerbsActionType} from './verbs.action';
import {initialVerbsState, VerbsState, verbsAdapter} from './verbs.state';

export function verbsReducer(state: VerbsState = initialVerbsState, action: VerbsAction): VerbsState {
  switch (action.type) {
    case VerbsActionType.GET_SUCCESS:
      return verbsAdapter.setAll(action.payload.verbs, state);
    case VerbsActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case VerbsActionType.CLEAR:
      return initialVerbsState;
    default:
      return state;
  }
}
