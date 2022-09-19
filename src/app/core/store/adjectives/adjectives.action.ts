import {Adjective} from './../../model/adjective';
import {Action} from '@ngrx/store';

export enum AdjectivesActionType {
  GET_ALL = '[Adjectives] Get All',
  GET_ALL_SUCCESS = '[Adjectives] Get All :: Success',

  CREATE = '[Adjectives] Create',
  CREATE_SUCCESS = '[Adjectives] Create :: Success',

  UPDATE = '[Adjective] Update',
  UPDATE_SUCCESS = '[Adjectives] Update :: Success',

  DELETE = '[Adjective] Delete',
  DELETE_SUCCESS = '[Adjective] Delete :: Success',
}

export class GetAllAdjectivesAction implements Action {
  public readonly type = AdjectivesActionType.GET_ALL;

  public constructor(
    public payload: {
      name?: string;
      hideDisabled?: boolean;
      onSuccess?: (adjectives: Adjective[]) => void;
      onFailure?: (error: Error) => void;
      sortBy?: string;
    }
  ) {}
}

export class GetAllAdjectivesSuccessAction implements Action {
  public readonly type = AdjectivesActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {adjectives: Adjective[]}) {}
}

export class CreateNewAdjectiveAction implements Action {
  public readonly type = AdjectivesActionType.CREATE;

  public constructor(
    public payload: {
      adjective: Adjective;
      onSuccess?: (adjectives: Adjective) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateNewAdjectiveSuccessAction implements Action {
  public readonly type = AdjectivesActionType.CREATE_SUCCESS;

  public constructor(public payload: {adjective: Adjective}) {}
}

export class UpdateAdjectiveAction implements Action {
  public readonly type = AdjectivesActionType.UPDATE;

  public constructor(
    public payload: {
      adjectiveId: string;
      adjective: Adjective;
      onSuccess?: (adjectives: Adjective) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdateAdjectiveSuccessAction implements Action {
  public readonly type = AdjectivesActionType.UPDATE_SUCCESS;

  public constructor(public payload: {newAdjective: Adjective}) {}
}

export class DeleteAdjectiveAction implements Action {
  public readonly type = AdjectivesActionType.DELETE;

  public constructor(
    public payload: {
      id: string;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteAdjectiveSuccessAction implements Action {
  public readonly type = AdjectivesActionType.DELETE_SUCCESS;

  public constructor(public payload: {id: string}) {}
}

export type AdjectivesAction =
  | GetAllAdjectivesAction
  | GetAllAdjectivesSuccessAction
  | CreateNewAdjectiveAction
  | CreateNewAdjectiveSuccessAction
  | DeleteAdjectiveAction
  | DeleteAdjectiveSuccessAction;
