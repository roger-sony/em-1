import {Action} from '@ngrx/store';
import {Chapter} from '../../model/chapter';
import {Task} from '../../model/task';
import {InventoryItem} from '../../model/inventory-item';
import {DecisionTable} from '../../model/decision-table';

export enum ChaptersActionType {
  GET_ALL = '[Chapters] Get All',
  GET_ALL_SUCCESS = '[Chapters] Get All :: Success',

  GET_SINGLE = '[Chapters] Get Single',
  GET_SINGLE_SUCCESS = '[Chapters] Get Single :: Success',

  GET_TASKS = '[Chapters] Get Tasks',
  GET_TASKS_SUCCESS = '[Chapters] Get Tasks :: Success',

  GET_NOUNS = '[Chapters] Get Nouns',
  GET_NOUNS_SUCCESS = '[Chapters] Get Nouns :: Success',

  GET_PLANS = '[Chapters] Get Plans',
  GET_PLANS_SUCCESS = '[Chapters] Get Plans :: Success',

  CREATE = '[Chapters] Create',
  CREATE_SUCCESS = '[Chapters] Create :: Success',

  UPDATE = '[Chapters] Update',
  UPDATE_SUCCESS = '[Chapters] Update :: Success',

  DELETE = '[Chapters] Delete',
  DELETE_SUCCESS = '[Chapters] Delete :: Success',

  CLEAR = '[Chapters] Clear',
}

export class GetAllChaptersAction implements Action {
  public readonly type = ChaptersActionType.GET_ALL;

  public constructor(
    public payload: {
      onSuccess?: (chapters: Chapter[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllChaptersSuccessAction implements Action {
  public readonly type = ChaptersActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {chapters: Chapter[]}) {}
}

export class GetSingleChapterAction implements Action {
  public readonly type = ChaptersActionType.GET_SINGLE;

  public constructor(
    public payload: {
      chapterId: string;
      onSuccess?: (chapter: Chapter) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetSingleChapterSuccessAction implements Action {
  public readonly type = ChaptersActionType.GET_SINGLE_SUCCESS;

  public constructor(public payload: {chapter: Chapter}) {}
}

export class GetChapterTasksAction implements Action {
  public readonly type = ChaptersActionType.GET_TASKS;

  public constructor(
    public payload: {
      chapterId: string;
      onSuccess?: (tasks: Task[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetChapterTasksSuccessAction implements Action {
  public readonly type = ChaptersActionType.GET_TASKS_SUCCESS;

  public constructor(public payload: {chapterId: string; tasks: Task[]}) {}
}

export class GetChapterNounsAction implements Action {
  public readonly type = ChaptersActionType.GET_NOUNS;
  public constructor(
    public payload: {
      chapterId: string;
      onSuccess?: (nouns: InventoryItem[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetChapterNounsSuccessAction implements Action {
  public readonly type = ChaptersActionType.GET_NOUNS_SUCCESS;

  public constructor(public payload: {chapterId: string; nouns: InventoryItem[]}) {}
}
export class GetChapterPlansAction implements Action {
  public readonly type = ChaptersActionType.GET_PLANS;

  public constructor(
    public payload: {
      chapterId: string;
      onSuccess?: (plans: DecisionTable[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetChapterPlansSuccessAction implements Action {
  public readonly type = ChaptersActionType.GET_PLANS_SUCCESS;

  public constructor(public payload: {chapterId: string; plans: DecisionTable[]}) {}
}

export class CreateChapterAction implements Action {
  public readonly type = ChaptersActionType.CREATE;

  public constructor(
    public payload: {
      chapter: Partial<Chapter>;
      onSuccess?: (chapter: Chapter) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateChapterSuccessAction implements Action {
  public readonly type = ChaptersActionType.CREATE_SUCCESS;

  public constructor(public payload: {chapter: Chapter}) {}
}

export class UpdateChapterAction implements Action {
  public readonly type = ChaptersActionType.UPDATE;

  public constructor(
    public payload: {
      chapterId: string;
      chapterChange: Partial<Chapter>;
      onSuccess?: (chapter: Chapter) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdateChapterSuccessAction implements Action {
  public readonly type = ChaptersActionType.UPDATE_SUCCESS;

  public constructor(public payload: {chapter: Chapter}) {}
}

export class DeleteChapterAction implements Action {
  public readonly type = ChaptersActionType.DELETE;

  public constructor(
    public payload: {
      chapterId: string;
      onSuccess?: (chapterId: string) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteChapterSuccessAction implements Action {
  public readonly type = ChaptersActionType.DELETE_SUCCESS;

  public constructor(public payload: {chapterId: string}) {}
}

export class ClearChaptersAction implements Action {
  public readonly type = ChaptersActionType.CLEAR;
}

export type ChaptersAction =
  | GetAllChaptersAction
  | GetAllChaptersSuccessAction
  | GetSingleChapterAction
  | GetSingleChapterSuccessAction
  | GetChapterTasksAction
  | GetChapterTasksSuccessAction
  | GetChapterNounsAction
  | GetChapterNounsSuccessAction
  | GetChapterPlansAction
  | GetChapterPlansSuccessAction
  | CreateChapterAction
  | CreateChapterSuccessAction
  | UpdateChapterAction
  | UpdateChapterSuccessAction
  | DeleteChapterAction
  | DeleteChapterSuccessAction
  | ClearChaptersAction;
