import {Action} from '@ngrx/store';
import {NounRuleTrigger} from '../../model/noun-rule-trigger';

export enum NounRuleTriggersActionType {
  GET_ALL = '[Noun Rule Triggers] Get All',
  GET_ALL_SUCCESS = '[Noun Rule Triggers] Get All :: Success',

  GET_SINGLE = '[Noun Rule Triggers] Get Single',
  GET_SINGLE_SUCCESS = '[Noun Rule Triggers] Get Single :: Success',

  CREATE = '[Noun Rule Triggers] Create',
  CREATE_SUCCESS = '[Noun Rule Triggers] Create :: Success',

  DELETE = '[Noun Rule Triggers] Delete',
  DELETE_SUCCESS = '[Noun Rule Triggers] Delete :: Success',

  SET_LOADED = '[Noun Rule Triggers] Set Loaded',

  CLEAR = '[Noun Rule Triggers] Clear',
}

export class GetAllNounRuleTriggersAction implements Action {
  public readonly type = NounRuleTriggersActionType.GET_ALL;

  public constructor(
    public payload: {
      onSuccess?: (triggers: NounRuleTrigger[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllNounRuleTriggersSuccessAction implements Action {
  public readonly type = NounRuleTriggersActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {triggers: NounRuleTrigger[]}) {}
}

export class GetSingleNounRuleTriggerAction implements Action {
  public readonly type = NounRuleTriggersActionType.GET_SINGLE;

  public constructor(
    public payload: {
      id: string;
      ignoreErrors?: boolean;
      onSuccess?: (trigger: NounRuleTrigger) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetSingleNounRuleTriggerSuccessAction implements Action {
  public readonly type = NounRuleTriggersActionType.GET_SINGLE_SUCCESS;

  public constructor(public payload: {trigger: NounRuleTrigger}) {}
}

export class CreateNounRuleTriggerAction implements Action {
  public readonly type = NounRuleTriggersActionType.CREATE;

  public constructor(
    public payload: {
      trigger: NounRuleTrigger;
      onSuccess?: (trigger: NounRuleTrigger) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateNounRuleTriggerSuccessAction implements Action {
  public readonly type = NounRuleTriggersActionType.CREATE_SUCCESS;

  public constructor(public payload: {trigger: NounRuleTrigger}) {}
}

export class DeleteNounRuleTriggerAction implements Action {
  public readonly type = NounRuleTriggersActionType.DELETE;

  public constructor(
    public payload: {
      id: string;
      onSuccess?: (id: string) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteNounRuleTriggerSuccessAction implements Action {
  public readonly type = NounRuleTriggersActionType.DELETE_SUCCESS;

  public constructor(public payload: {id: string}) {}
}

export class SetNounRuleTriggersLoadedAction implements Action {
  public readonly type = NounRuleTriggersActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class ClearNounRuleTriggersAction implements Action {
  public readonly type = NounRuleTriggersActionType.CLEAR;
}

export type NounRuleTriggersAction =
  | GetAllNounRuleTriggersAction
  | GetAllNounRuleTriggersSuccessAction
  | GetSingleNounRuleTriggerAction
  | GetSingleNounRuleTriggerSuccessAction
  | CreateNounRuleTriggerAction
  | CreateNounRuleTriggerSuccessAction
  | DeleteNounRuleTriggerAction
  | DeleteNounRuleTriggerSuccessAction
  | SetNounRuleTriggersLoadedAction
  | ClearNounRuleTriggersAction;
