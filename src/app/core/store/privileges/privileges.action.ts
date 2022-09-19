import {Action} from '@ngrx/store';
import {Privilege} from '../../../app.constants';
import {Role} from '../../model/role';

export enum PrivilegesActionType {
  GET_ALL = '[Privileges] Get All',
  GET_ALL_SUCCESS = '[Privileges] Get All :: Success',

  CREATE_PRIVILEGE = '[Privileges] Create Privilege',

  UPDATE_PRIVILEGE = '[Privileges] Update Privilege',

  DELETE_PRIVILEGE = '[Privileges] Delete Privilege',

  FETCH_ALLOWED_PRIVILEGES = '[Privileges] Fetch Allowed',
  FETCH_ALLOWED_PRIVILEGES_SUCCESS = '[Privileges] Fetch Allowed :: Success',

  SET_ALLOWED_PRIVILEGES = '[Privileges] Set Allowed',

  SET_LOADED = '[Privileges] Set Loaded',

  CLEAR = '[Privileges] Clear',
}

export class SetAllowedPrivileges implements Action {
  public readonly type = PrivilegesActionType.SET_ALLOWED_PRIVILEGES;

  public constructor(
    public payload: {
      privileges: Privilege[];
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class FetchAllowedPrivilegesAction implements Action {
  public readonly type = PrivilegesActionType.FETCH_ALLOWED_PRIVILEGES;

  public constructor(
    public payload: {
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class FetchAllowedPrivilegesActionSuccess implements Action {
  public readonly type = PrivilegesActionType.FETCH_ALLOWED_PRIVILEGES_SUCCESS;

  public constructor(public payload: Privilege[]) {}
}

export class SetPrivilegesLoadedAction implements Action {
  public readonly type = PrivilegesActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class CreatePrivilegeAction implements Action {
  public readonly type = PrivilegesActionType.CREATE_PRIVILEGE;

  public constructor(
    public payload: {
      name: string;
      onSuccess?: (role: Role) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdatePrivilegeAction implements Action {
  public readonly type = PrivilegesActionType.UPDATE_PRIVILEGE;

  public constructor(
    public payload: {
      privilege: Privilege;
      onSuccess?: (role: Role) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeletePrivilegeAction implements Action {
  public readonly type = PrivilegesActionType.DELETE_PRIVILEGE;

  public constructor(
    public payload: {
      privilegeId: string;
      onSuccess?: (role: Role) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export type PrivilegesAction =
  | CreatePrivilegeAction
  | DeletePrivilegeAction
  | FetchAllowedPrivilegesAction
  | FetchAllowedPrivilegesActionSuccess
  | SetAllowedPrivileges
  | SetPrivilegesLoadedAction
  | UpdatePrivilegeAction;
