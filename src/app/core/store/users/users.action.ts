import {Action} from '@ngrx/store';
import {User} from '../../model/user';

export enum UsersActionType {
  GET_ALL = '[Users] Get All',
  GET_ALL_SUCCESS = '[Users] Get All :: Success',

  CLEAR = '[Users] Clear',
}

export class GetAllUsersAction implements Action {
  public readonly type = UsersActionType.GET_ALL;

  public constructor(
    public payload: {
      onSuccess?: (users: User[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllUsersSuccessAction implements Action {
  public readonly type = UsersActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {users: User[]}) {}
}

export class ClearUsersAction implements Action {
  public readonly type = UsersActionType.CLEAR;
}

export type UsersAction = ClearUsersAction | GetAllUsersAction | GetAllUsersSuccessAction;
