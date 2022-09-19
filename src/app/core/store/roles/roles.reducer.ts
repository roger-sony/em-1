import {RolesAction, RolesActionType} from './roles.action';
import {initialRolesState, rolesAdapter, RolesState} from './roles.state';

export function rolesReducer(state: RolesState = initialRolesState, action: RolesAction): RolesState {
  switch (action.type) {
    case RolesActionType.GET_ALL_SUCCESS:
      return rolesAdapter.setAll(action.payload.roles, state);
    case RolesActionType.CLEAR:
      return initialRolesState;
    default:
      return state;
  }
}
