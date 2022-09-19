import {AppState} from '../app-state';

export const selectPrivilegesState = (state: AppState) => state.privileges;

export const selectAllowedPrivileges = (state: AppState) => state.privileges.privileges;
