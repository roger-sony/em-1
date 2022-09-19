import {Action} from '@ngrx/store';
import {User} from '../../model/user';

export enum ActiveUserActionType {
  GET_ALL = '[Users] Get All',
  GET_ALL_SUCCESS = '[Users] Get All :: Success',

  SET_ACTIVE_USER = '[Users] Set Active User',
  SET_ACTIVE_USER_PRIVILEGES = '[Users] Set Active User Privileges',

  CLEAR = '[Users] Clear',
}

export class SetActiveUser implements Action {
  public readonly type = ActiveUserActionType.SET_ACTIVE_USER;

  public constructor(
    public payload: {
      user: User;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class SetActiveUserPrivileges implements Action {
  public readonly type = ActiveUserActionType.SET_ACTIVE_USER_PRIVILEGES;

  public constructor(
    public payload: {
      privileges: string[];
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export type ActiveUserAction = SetActiveUser | SetActiveUserPrivileges;
