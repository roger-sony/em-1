import {AppState} from '../app-state';

export const selectActiveUserState = (state: AppState) => state.activeUser;

export const selectActiveUser = (state: AppState) => state.activeUser.user;

export const selectActiveUserPrivileges = (state: AppState) => state.activeUser.privileges;
