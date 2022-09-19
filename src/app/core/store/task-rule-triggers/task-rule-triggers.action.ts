import {Action} from '@ngrx/store';
import {TaskRuleTrigger} from '../../model/task-rule-trigger';

export enum TaskRuleTriggersActionType {
  GET_ALL = '[Task Rule Triggers] Get All',
  GET_ALL_SUCCESS = '[Task Rule Triggers] Get All :: Success',

  GET_SINGLE = '[Task Rule Triggers] Get Single',
  GET_SINGLE_SUCCESS = '[Task Rule Triggers] Get Single :: Success',

  CREATE = '[Task Rule Triggers] Create',
  CREATE_SUCCESS = '[Task Rule Triggers] Create :: Success',

  DELETE = '[Task Rule Triggers] Delete',
  DELETE_SUCCESS = '[Task Rule Triggers] Delete :: Success',

  SET_LOADED = '[Task Rule Triggers] Set Loaded',

  CLEAR = '[Task Rule Triggers] Clear',
}

export class GetAllTaskRuleTriggersAction implements Action {
  public readonly type = TaskRuleTriggersActionType.GET_ALL;

  public constructor(
    public payload: {
      onSuccess?: (triggers: TaskRuleTrigger[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllTaskRuleTriggersSuccessAction implements Action {
  public readonly type = TaskRuleTriggersActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {triggers: TaskRuleTrigger[]}) {}
}

export class GetSingleTaskRuleTriggerAction implements Action {
  public readonly type = TaskRuleTriggersActionType.GET_SINGLE;

  public constructor(
    public payload: {
      id: string;
      ignoreErrors?: boolean;
      onSuccess?: (trigger: TaskRuleTrigger) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetSingleTaskRuleTriggerSuccessAction implements Action {
  public readonly type = TaskRuleTriggersActionType.GET_SINGLE_SUCCESS;

  public constructor(public payload: {trigger: TaskRuleTrigger}) {}
}

export class CreateTaskRuleTriggerAction implements Action {
  public readonly type = TaskRuleTriggersActionType.CREATE;

  public constructor(
    public payload: {
      trigger: TaskRuleTrigger;
      onSuccess?: (trigger: TaskRuleTrigger) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateTaskRuleTriggerSuccessAction implements Action {
  public readonly type = TaskRuleTriggersActionType.CREATE_SUCCESS;

  public constructor(public payload: {trigger: TaskRuleTrigger}) {}
}

export class DeleteTaskRuleTriggerAction implements Action {
  public readonly type = TaskRuleTriggersActionType.DELETE;

  public constructor(
    public payload: {
      id: string;
      onSuccess?: (id: string) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteTaskRuleTriggerSuccessAction implements Action {
  public readonly type = TaskRuleTriggersActionType.DELETE_SUCCESS;

  public constructor(public payload: {id: string}) {}
}

export class SetTaskRuleTriggersLoadedAction implements Action {
  public readonly type = TaskRuleTriggersActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class ClearTaskRuleTriggersAction implements Action {
  public readonly type = TaskRuleTriggersActionType.CLEAR;
}

export type TaskRuleTriggersAction =
  | GetAllTaskRuleTriggersAction
  | GetAllTaskRuleTriggersSuccessAction
  | GetSingleTaskRuleTriggerAction
  | GetSingleTaskRuleTriggerSuccessAction
  | CreateTaskRuleTriggerAction
  | CreateTaskRuleTriggerSuccessAction
  | DeleteTaskRuleTriggerAction
  | DeleteTaskRuleTriggerSuccessAction
  | SetTaskRuleTriggersLoadedAction
  | ClearTaskRuleTriggersAction;
