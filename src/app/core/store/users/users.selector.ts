import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {usersAdapter} from './users.state';

export const selectUsersState = (state: AppState) => state.users;

export const selectAllUsers = createSelector(selectUsersState, usersAdapter.getSelectors().selectAll);

export const selectUsersMap = createSelector(selectUsersState, usersAdapter.getSelectors().selectEntities);

export const selectUserById = (id: string) => createSelector(selectUsersMap, usersMap => usersMap[id]);
