import {ROUTER_NAVIGATION, routerReducer} from '@ngrx/router-store';
import {Action} from '@ngrx/store';
import {CustomRouterReducerState, CustomRouterState} from './router.state';

export function customRouterReducer(state: CustomRouterReducerState, action: Action): CustomRouterReducerState {
  const routerState = routerReducer<CustomRouterState>(state, action);

  if (action.type !== ROUTER_NAVIGATION) {
    return routerState;
  }

  return {...routerState, previousState: state && state.state};
}
