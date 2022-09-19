import {Verb} from './../../model/verb';
import {Action} from '@ngrx/store';

export enum VerbsActionType {
  GET = '[Verbs] Get',
  GET_SUCCESS = '[Verbs] Get :: Success',

  CREATE = '[Verbs] Create',
  CREATE_SUCCESS = '[Verbs] Create :: Success',

  DELETE = '[Verbs] Delete',
  DELETE_SUCCESS = '[Verbs] Delete :: Success',

  SET_LOADED = '[Verbs] Set Loaded',

  CLEAR = '[Verbs] Clear',
}

export class GetVerbsAction implements Action {
  public readonly type = VerbsActionType.GET;

  public constructor(
    public payload: {
      onSuccess?: (verbs: Verb[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetVerbsSuccessAction implements Action {
  public readonly type = VerbsActionType.GET_SUCCESS;

  public constructor(public payload: {verbs: Verb[]}) {}
}

export class CreateVerbAction implements Action {
  public readonly type = VerbsActionType.CREATE;

  public constructor(
    public payload: {
      verb: Verb;
      onSuccess?: (verb: Verb) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateVerbSuccessAction implements Action {
  public readonly type = VerbsActionType.CREATE_SUCCESS;

  public constructor(public payload: {verb: Verb}) {}
}

export class DeleteVerbAction implements Action {
  public readonly type = VerbsActionType.DELETE;

  public constructor(
    public payload: {
      verbId: string;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteVerbSuccessAction implements Action {
  public readonly type = VerbsActionType.DELETE_SUCCESS;

  public constructor(public payload: {verbId: string}) {}
}

export class SetVerbsLoadedAction implements Action {
  public readonly type = VerbsActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class ClearVerbsAction implements Action {
  public readonly type = VerbsActionType.CLEAR;
}

export type VerbsAction =
  | GetVerbsAction
  | GetVerbsSuccessAction
  | CreateVerbAction
  | CreateVerbSuccessAction
  | DeleteVerbAction
  | DeleteVerbSuccessAction
  | SetVerbsLoadedAction
  | ClearVerbsAction;
