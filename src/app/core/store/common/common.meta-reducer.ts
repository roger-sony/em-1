import {Action, ActionReducer} from '@ngrx/store';
import {AppState, initialAppState} from '../app-state';
import {CommonActionType} from './common.action';

export function commonMetaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: Action) => {
    if (action.type === CommonActionType.CLEAR_ALL) {
      return initialAppState();
    }

    return reducer(state, action);
  };
}
