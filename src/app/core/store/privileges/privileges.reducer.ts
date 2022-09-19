import {PrivilegesAction, PrivilegesActionType} from './privileges.action';
import {PrivilegesState, initialPrivilegesState} from './privileges.state';

export function privilegesReducer(
  state: PrivilegesState = initialPrivilegesState,
  action: PrivilegesAction
): PrivilegesState {
  switch (action.type) {
    case PrivilegesActionType.FETCH_ALLOWED_PRIVILEGES_SUCCESS:
      return {...state, privileges: action.payload};
    case PrivilegesActionType.SET_ALLOWED_PRIVILEGES:
      return {...state, privileges: action.payload.privileges};
    default:
      return state;
  }
}
