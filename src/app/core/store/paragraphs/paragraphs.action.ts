import {Paragraph} from '../../model/paragraph';
import {Action} from '@ngrx/store';
import {FactFilter} from '../../model/fact-filter';
import {FieldValues} from '../../model/field-values';
import {TaskInstance} from '../../model/task-instance';
import {Sentence} from '../../model/sentence';

export enum ParagraphsActionType {
  GET = '[Paragraphs] Get',
  GET_SUCCESS = '[Paragraphs] Get :: Success',

  SET_COUNT = '[Paragraphs] Set Count',

  GET_INSTANCES = '[Paragraphs] Get Paragraph Instances',
  GET_INSTANCES_SUCCESS = '[Paragraphs] Get Paragraph Instances :: Success',

  GET_ALL_FIELD_VALUES = '[Paragraphs] Get All Field Values',
  GET_ALL_FIELD_VALUES_SUCCESS = '[Paragraphs] Get All Field Values :: Success',

  CREATE = '[Paragraphs] Create',
  CREATE_SUCCESS = '[Paragraphs] Create :: Success',

  UPDATE = '[Paragraphs] Update',
  UPDATE_SUCCESS = '[Paragraphs] Update :: Success',

  DELETE = '[Paragraphs] Delete',
  DELETE_SUCCESS = '[Paragraphs] Delete :: Success',

  SET_LOADED = '[Paragraphs] Set Loaded',
  SET_INSTANCES_LOADED = '[Paragraphs] Set Instances Loaded',

  UPDATE_FACTS = '[Paragraphs] Update Facts',
  CLEAR_FACTS = '[Paragraphs] Clear Facts',

  UPDATE_SENTENCES = '[Paragraphs] Update Sentences',
  CLEAR_SENTENCES = '[Paragraphs] Clear Sentences',

  CLEAR = '[Paragraphs] Clear',
}

export class GetParagraphsAction implements Action {
  public readonly type = ParagraphsActionType.GET;

  public constructor(
    public payload: {
      queries?: {[key: string]: string | boolean};
      onSuccess?: (paragraphs: Paragraph[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetParagraphsSuccessAction implements Action {
  public readonly type = ParagraphsActionType.GET_SUCCESS;

  public constructor(public payload: {paragraphs: Paragraph[]}) {}
}

export class SetParagraphsCountAction implements Action {
  public readonly type = ParagraphsActionType.SET_COUNT;

  public constructor(public payload: {paragraphsCount: number}) {}
}

export class GetParagraphInstancesAction implements Action {
  public readonly type = ParagraphsActionType.GET_INSTANCES;

  public constructor(
    public payload: {
      force?: boolean;
      onSuccess?: (taskInstances: TaskInstance[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetParagraphInstancesSuccessAction implements Action {
  public readonly type = ParagraphsActionType.GET_INSTANCES_SUCCESS;

  public constructor(public payload: {taskInstances: TaskInstance[]}) {}
}

export class GetAllTaskFieldValuesAction implements Action {
  public readonly type = ParagraphsActionType.GET_ALL_FIELD_VALUES;

  public constructor(
    public payload: {
      onSuccess?: (fieldValues: FieldValues) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllTaskFieldValuesSuccessAction implements Action {
  public readonly type = ParagraphsActionType.GET_ALL_FIELD_VALUES_SUCCESS;

  public constructor(public payload: {fieldValues: FieldValues}) {}
}

export class CreateParagraphAction implements Action {
  public readonly type = ParagraphsActionType.CREATE;

  public constructor(
    public payload: {
      paragraph: Paragraph;
      onSuccess?: (paragraph: Paragraph) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateParagraphSuccessAction implements Action {
  public readonly type = ParagraphsActionType.CREATE_SUCCESS;

  public constructor(public payload: {paragraph: Paragraph}) {}
}

export class UpdateParagraphAction implements Action {
  public readonly type = ParagraphsActionType.UPDATE;

  public constructor(
    public payload: {
      paragraphId: string;
      paragraphChange: Partial<Paragraph>;
      edited?: boolean;
      onSuccess?: (paragraph: Paragraph) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdateParagraphSuccessAction implements Action {
  public readonly type = ParagraphsActionType.UPDATE_SUCCESS;

  public constructor(public payload: {paragraph: Paragraph}) {}
}

export class DeleteParagraphAction implements Action {
  public readonly type = ParagraphsActionType.DELETE;

  public constructor(
    public payload: {
      paragraphId: string;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteParagraphSuccessAction implements Action {
  public readonly type = ParagraphsActionType.DELETE_SUCCESS;

  public constructor(public payload: {paragraphId: string}) {}
}

export class SetParagraphsLoadedAction implements Action {
  public readonly type = ParagraphsActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class SetParagraphInstancesLoadedAction implements Action {
  public readonly type = ParagraphsActionType.SET_INSTANCES_LOADED;

  public constructor(public payload: {instancesLoaded: boolean}) {}
}

export class UpdateFactsAction implements Action {
  public readonly type = ParagraphsActionType.UPDATE_FACTS;

  public constructor(public payload: {facts: FactFilter[]}) {}
}

export class ClearFactsAction implements Action {
  public readonly type = ParagraphsActionType.CLEAR_FACTS;
}

export class UpdateSentencesAction implements Action {
  public readonly type = ParagraphsActionType.UPDATE_SENTENCES;

  //TODO: Variable name
  public constructor(public payload: {sentences: Sentence[]}) {}
}

export class ClearSentencesAction implements Action {
  public readonly type = ParagraphsActionType.CLEAR_SENTENCES;
}

export class ClearTasksAction implements Action {
  public readonly type = ParagraphsActionType.CLEAR;
}

export type ParagraphsAction =
  | GetParagraphsAction
  | GetParagraphsSuccessAction
  | SetParagraphsCountAction
  | GetParagraphInstancesAction
  | GetParagraphInstancesSuccessAction
  | GetAllTaskFieldValuesAction
  | GetAllTaskFieldValuesSuccessAction
  | CreateParagraphAction
  | CreateParagraphSuccessAction
  | UpdateParagraphAction
  | UpdateParagraphSuccessAction
  | DeleteParagraphAction
  | DeleteParagraphSuccessAction
  | SetParagraphsLoadedAction
  | SetParagraphInstancesLoadedAction
  | UpdateFactsAction
  | ClearFactsAction
  | UpdateSentencesAction
  | ClearSentencesAction
  | ClearTasksAction;
