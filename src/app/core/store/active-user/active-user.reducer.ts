import {ActiveUserAction, ActiveUserActionType} from './active-user.action';
import {ActiveUserState, initialActiveUserState} from './active-user.state';

export function activeUserReducer(
  state: ActiveUserState = initialActiveUserState,
  action: ActiveUserAction
): ActiveUserState {
  switch (action.type) {
    case ActiveUserActionType.SET_ACTIVE_USER:
      return {...state, user: action.payload.user};
    case ActiveUserActionType.SET_ACTIVE_USER_PRIVILEGES:
      return {...state, privileges: action.payload.privileges};
    default:
      return state;
  }
}
