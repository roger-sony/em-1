import {Sentence} from './../../model/sentence';
import {Action} from '@ngrx/store';

export enum SentencesActionType {
  GET = '[Sentences] Get',
  GET_SUCCESS = '[Sentences] Get :: Success',

  CREATE = '[Sentences] Create',
  CREATE_SUCCESS = '[Sentences] Create :: Success',

  DELETE = '[Sentences] Delete',
  DELETE_SUCCESS = '[Sentences] Delete :: Success',

  SET_LOADED = '[Sentences] Set Loaded',

  CLEAR = '[Sentences] Clear',
}

export class GetSentencesAction implements Action {
  public readonly type = SentencesActionType.GET;

  public constructor(
    public payload: {
      onSuccess?: (sentences: Sentence[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetSentencesSuccessAction implements Action {
  public readonly type = SentencesActionType.GET_SUCCESS;

  public constructor(public payload: {sentences: Sentence[]}) {}
}

export class CreateSentenceAction implements Action {
  public readonly type = SentencesActionType.CREATE;

  public constructor(
    public payload: {
      sentence: Sentence;
      onSuccess?: (sentence: Sentence) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateSentenceSuccessAction implements Action {
  public readonly type = SentencesActionType.CREATE_SUCCESS;

  public constructor(public payload: {sentence: Sentence}) {}
}

export class DeleteSentenceAction implements Action {
  public readonly type = SentencesActionType.DELETE;

  public constructor(
    public payload: {
      sentenceId: string;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteSentenceSuccessAction implements Action {
  public readonly type = SentencesActionType.DELETE_SUCCESS;

  public constructor(public payload: {sentenceId: string}) {}
}

export class SetSentencesLoadedAction implements Action {
  public readonly type = SentencesActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class ClearSentencesAction implements Action {
  public readonly type = SentencesActionType.CLEAR;
}

export type SentencesAction =
  | GetSentencesAction
  | GetSentencesSuccessAction
  | CreateSentenceAction
  | CreateSentenceSuccessAction
  | DeleteSentenceAction
  | DeleteSentenceSuccessAction
  | SetSentencesLoadedAction
  | ClearSentencesAction;
