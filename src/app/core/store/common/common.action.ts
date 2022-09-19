import {Action} from '@ngrx/store';

export enum CommonActionType {
  CLEAR_ALL = '[Common] Clear All',
  EXECUTE_CALLBACK = '[Common] Execute Callback',
  HANDLE_ERROR = '[Common] Handle Error',
}

export class ClearAllAction implements Action {
  public readonly type = CommonActionType.CLEAR_ALL;
}

export class ExecuteCallbackAction implements Action {
  public readonly type = CommonActionType.EXECUTE_CALLBACK;

  public constructor(public payload: {callback: () => void}) {}
}

export class HandleErrorAction implements Action {
  public readonly type = CommonActionType.HANDLE_ERROR;

  public constructor(public payload: {error: Error}) {}
}
