import {Action} from '@ngrx/store';
import {NounDto} from '../../api/dto/noun.dto';

export enum NounsActionType {
  GET = '[Nouns] Get',
  GET_SUCCESS = '[Nouns] Get :: Success',

  CREATE = '[Nouns] Create',
  CREATE_SUCCESS = '[Nouns] Create :: Success',

  UPDATE = '[Nouns] Update',
  UPDATE_SUCCESS = '[Nouns] Update :: Success',

  SET_LOADED = '[Nouns] Set Loaded',
  SET_INSTANCES_LOADED = '[Nouns] Set Instances Loaded',

  GET_POSSIBLE_COLUMNS = '[Nouns] Get possible columns',
  GET_POSSIBLE_COLUMNS_SUCCESS = '[Nouns] Get possible columns :: Success',

  GET_DISPLAYED_COLUMNS = '[Nouns] Get displayed columns',
  UPDATE_DISPLAYED_COLUMNS = '[Nouns] Update displayed columns',
}

export class GetNounsAction implements Action {
  public readonly type = NounsActionType.GET;

  public constructor(
    public payload: {
      force?: boolean;
      queries?: {[key: string]: string | boolean};
      onSuccess?: (nouns: NounDto[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateNounAction implements Action {
  public readonly type = NounsActionType.CREATE;

  public constructor(
    public payload: {
      noun?: NounDto;
      createBatch?: boolean;
      batchAmount?: number;
      batchStart?: number;
      onSuccess?: (noun: NounDto) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdateNounAction implements Action {
  public readonly type = NounsActionType.UPDATE;

  public constructor(
    public payload: {
      noun?: NounDto;
      onSuccess?: (noun: NounDto) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateNounSuccessAction implements Action {
  public readonly type = NounsActionType.CREATE_SUCCESS;

  public constructor(public payload: {noun: NounDto}) {}
}

export class GetPossibleColumnsAction implements Action {
  public readonly type = NounsActionType.GET_POSSIBLE_COLUMNS;

  public constructor(
    public payload: {
      onSuccess?: (possibleColumns: string[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetDisplayedColumnsAction implements Action {
  public readonly type = NounsActionType.GET_DISPLAYED_COLUMNS;

  public constructor(public payload: {displayedColumns: string[]}) {}
}

export class UpdateDisplayedColumnsAction implements Action {
  public readonly type = NounsActionType.UPDATE_DISPLAYED_COLUMNS;

  public constructor(public payload: {displayedColumns: string[]}) {}
}

export class GetNounsSuccessAction implements Action {
  public readonly type = NounsActionType.GET_SUCCESS;

  public constructor(public payload: {nouns: NounDto[]}) {}
}

export class GetPossibleColumnsSuccessAction implements Action {
  public readonly type = NounsActionType.GET_POSSIBLE_COLUMNS_SUCCESS;

  public constructor(public payload: {possibleColumns: string[]}) {}
}

export class SetNounsLoadedAction implements Action {
  public readonly type = NounsActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export type NounsAction =
  | CreateNounSuccessAction
  | GetDisplayedColumnsAction
  | GetNounsAction
  | GetNounsSuccessAction
  | GetPossibleColumnsAction
  | GetPossibleColumnsSuccessAction
  | SetNounsLoadedAction
  | UpdateDisplayedColumnsAction
  | UpdateNounAction;
