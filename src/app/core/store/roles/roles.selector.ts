import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {rolesAdapter} from './roles.state';

export const selectRolesState = (state: AppState) => state.roles;

export const selectAllRoles = createSelector(selectRolesState, rolesAdapter.getSelectors().selectAll);

export const selectRolesMap = createSelector(selectRolesState, rolesAdapter.getSelectors().selectEntities);

export const selectRoleById = (id: string) => createSelector(selectRolesMap, rolesMap => rolesMap[id]);
