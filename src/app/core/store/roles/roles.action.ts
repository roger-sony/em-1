import {Action} from '@ngrx/store';
import {Role} from '../../model/role';
import {RoleDto} from '../../api/dto/role.dto';

export enum RolesActionType {
  GET_ALL = '[Roles] Get All',
  GET_ALL_SUCCESS = '[Roles] Get All :: Success',

  FETCH_FOR_CURRENT_USER = '[Roles] Fetch for current user',
  FETCH_FOR_CURRENT_USER_SUCCESS = '[Roles] Fetch for current user :: Success',

  CREATE = '[Roles] Create',
  CREATE_SUCCESS = '[Roles] Create :: Success',

  UPDATE = '[Roles] Update',
  UPDATE_SUCCESS = '[Roles] Update :: Success',

  DELETE = '[Roles] Delete',

  CLEAR = '[Roles] Clear',
}

export class GetAllRolesAction implements Action {
  public readonly type = RolesActionType.GET_ALL;

  public constructor(
    public payload: {
      onSuccess?: (roles: Role[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllRolesSuccessAction implements Action {
  public readonly type = RolesActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {roles: Role[]}) {}
}

export class FetchActiveUserRoles implements Action {
  public readonly type = RolesActionType.FETCH_FOR_CURRENT_USER;

  public constructor(
    public payload: {
      onSuccess?: (roles: RoleDto[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class FetchActiveUserRolesSuccessAction implements Action {
  public readonly type = RolesActionType.FETCH_FOR_CURRENT_USER_SUCCESS;

  public constructor() {}
}

export class CreateNewRoleAction implements Action {
  public readonly type = RolesActionType.CREATE;

  public constructor(
    public payload: {
      role: Role;
      onSuccess?: (role: Role) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateNewRoleSuccessAction implements Action {
  public readonly type = RolesActionType.CREATE_SUCCESS;

  public constructor(public payload: {role: Role}) {}
}

export class UpdateRoleAction implements Action {
  public readonly type = RolesActionType.UPDATE;

  public constructor(
    public payload: {
      role: Role;
      onSuccess?: (role: Role) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdateRoleSuccessAction implements Action {
  public readonly type = RolesActionType.UPDATE_SUCCESS;

  public constructor(public payload: {role: Role}) {}
}

export class DeleteRoleAction implements Action {
  public readonly type = RolesActionType.DELETE;

  public constructor(
    public payload: {
      roleId: string;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class ClearRolesAction implements Action {
  public readonly type = RolesActionType.CLEAR;
}

export type RolesAction =
  | GetAllRolesAction
  | GetAllRolesSuccessAction
  | DeleteRoleAction
  | ClearRolesAction
  | CreateNewRoleAction
  | CreateNewRoleSuccessAction
  | UpdateRoleAction
  | UpdateRoleSuccessAction;
