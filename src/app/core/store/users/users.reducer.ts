import {UsersAction, UsersActionType} from './users.action';
import {initialUsersState, usersAdapter, UsersState} from './users.state';

export function usersReducer(state: UsersState = initialUsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionType.GET_ALL_SUCCESS:
      return usersAdapter.setAll(action.payload.users, state);
    case UsersActionType.CLEAR:
      return initialUsersState;
    default:
      return state;
  }
}
