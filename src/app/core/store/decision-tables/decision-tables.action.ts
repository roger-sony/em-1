import {Action} from '@ngrx/store';
import {DecisionTable} from '../../model/decision-table';
import {DecisionTablePreview} from '../../model/decision-table-preview';
import {CadenceForm} from '../../model/form/cadence-form';
import {PlanForm} from '../../model/form/plan-form';
import {TriggerForm} from '../../model/form/trigger-form';
import {PlanPreviewTableData} from '../../model/plan-preview-table-data';

export enum DecisionTablesActionType {
  GET_ALL = '[Decision Tables] Get All',
  GET_ALL_SUCCESS = '[Decision Tables] Get All :: Success',

  GET_SINGLE = '[Decision Tables] Get Single',
  GET_SINGLE_SUCCESS = '[Decision Tables] Get Single :: Success',

  GET_PREVIEW = '[Decision Tables] Get Preview',
  GET_PREVIEW_SUCCESS = '[Decision Tables] Get Preview :: Success',

  ADD_REPORT = '[Decision Tables] Add Report',
  ADD_REPORT_SUCCESS = '[Decision Tables] Add Report Success',

  CREATE_WITH_TRIGGERS = '[Decision Tables] Create With Triggers',

  CREATE = '[Decision Tables] Create',
  CREATE_SUCCESS = '[Decision Tables] Create :: Success',

  UPDATE = '[Decision Tables] Update',
  UPDATE_SUCCESS = '[Decision Tables] Update :: Success',

  PATCH = '[Decision Tables] Patch',

  DELETE = '[Decision Tables] Delete',
  DELETE_SUCCESS = '[Decision Tables] Delete :: Success',

  ADD_TO_CHAPTER = '[Decision Tables] Add To Chapter',
  REMOVE_FROM_CHAPTER = '[Decision Tables] Remove From Chapter',

  DOWNLOAD_EXCEL_FILE = '[Decision Tables] Download Excel File',

  SET_LOADED = '[Decision Tables] Set Loaded',

  RUN_RULE = '[Decision Tables] Run Rule',

  CLEAR = '[Decision Tables] Clear',
}

export class GetAllDecisionTablesAction implements Action {
  public readonly type = DecisionTablesActionType.GET_ALL;

  public constructor(
    public payload: {
      onSuccess?: (decisionTables: DecisionTable[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllDecisionTablesSuccessAction implements Action {
  public readonly type = DecisionTablesActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {decisionTables: DecisionTable[]}) {}
}

export class GetSingleDecisionTableAction implements Action {
  public readonly type = DecisionTablesActionType.GET_SINGLE;

  public constructor(
    public payload: {
      id: string;
      onSuccess?: (decisionTable: DecisionTable) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetSingleDecisionTableSuccessAction implements Action {
  public readonly type = DecisionTablesActionType.GET_SINGLE_SUCCESS;

  public constructor(public payload: {decisionTable: DecisionTable}) {}
}

export class GetDecisionTablePreviewAction implements Action {
  public readonly type = DecisionTablesActionType.GET_PREVIEW;

  public constructor(
    public payload: {
      id: string;
      onSuccess?: (preview: DecisionTablePreview) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetDecisionTablePreviewSuccessAction implements Action {
  public readonly type = DecisionTablesActionType.GET_PREVIEW_SUCCESS;

  public constructor(public payload: {preview: DecisionTablePreview}) {}
}

export class AddDecisionTableReportAction implements Action {
  public readonly type = DecisionTablesActionType.ADD_REPORT;

  public constructor(
    public payload: {
      preview: DecisionTablePreview;
      onSuccess?: (preview: DecisionTablePreview) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateDecisionTableWithTriggersAction implements Action {
  public readonly type = DecisionTablesActionType.CREATE_WITH_TRIGGERS;

  public constructor(
    public payload: {
      planForm: PlanForm;
      cadenceForm: CadenceForm;
      triggerForm: TriggerForm;
      onSuccess?: (decisionTable: DecisionTable) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateDecisionTableAction implements Action {
  public readonly type = DecisionTablesActionType.CREATE;

  public constructor(
    public payload: {
      decisionTable: DecisionTable;
      onSuccess?: (decisionTable: DecisionTable) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateDecisionTableSuccessAction implements Action {
  public readonly type = DecisionTablesActionType.CREATE_SUCCESS;

  public constructor(public payload: {decisionTable: DecisionTable}) {}
}

export class UpdateDecisionTableAction implements Action {
  public readonly type = DecisionTablesActionType.UPDATE;

  public constructor(
    public payload: {
      decisionTable: DecisionTable;
      onSuccess?: (decisionTable: DecisionTable) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdateDecisionTableSuccessAction implements Action {
  public readonly type = DecisionTablesActionType.UPDATE_SUCCESS;

  public constructor(public payload: {decisionTable: DecisionTable}) {}
}

export class PatchDecisionTableAction implements Action {
  public readonly type = DecisionTablesActionType.PATCH;

  public constructor(
    public payload: {
      decisionTableId: string;
      decisionTableChange: Partial<DecisionTable>;
      onSuccess?: (decisionTable: DecisionTable) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteDecisionTableAction implements Action {
  public readonly type = DecisionTablesActionType.DELETE;

  public constructor(
    public payload: {
      id: string;
      onSuccess?: (id: string) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteDecisionTableSuccessAction implements Action {
  public readonly type = DecisionTablesActionType.DELETE_SUCCESS;

  public constructor(public payload: {id: string}) {}
}

export class AddDecisionTableToChapterAction implements Action {
  public readonly type = DecisionTablesActionType.ADD_TO_CHAPTER;

  public constructor(
    public payload: {
      decisionTableId: string;
      chapterId: string;
      onSuccess?: (decisionTable: DecisionTable) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class RemoveDecisionTableFromChapterAction implements Action {
  public readonly type = DecisionTablesActionType.REMOVE_FROM_CHAPTER;

  public constructor(
    public payload: {
      decisionTableId: string;
      chapterId: string;
      onSuccess?: (decisionTable: DecisionTable) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class SetDecisionTablesLoadedAction implements Action {
  public readonly type = DecisionTablesActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class RunDecisionTableRuleAction implements Action {
  public readonly type = DecisionTablesActionType.RUN_RULE;

  public constructor(
    public payload: {
      decisionTableId: string;
      saveReport: boolean;
      triggerActions: boolean;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DownloadExcelFileAction implements Action {
  public readonly type = DecisionTablesActionType.DOWNLOAD_EXCEL_FILE;

  constructor(public payload: {tableData: PlanPreviewTableData[]; name: string}) {}
}

export class ClearDecisionTablesAction implements Action {
  public readonly type = DecisionTablesActionType.CLEAR;
}

export type DecisionTablesAction =
  | GetAllDecisionTablesAction
  | GetAllDecisionTablesSuccessAction
  | GetSingleDecisionTableAction
  | GetSingleDecisionTableSuccessAction
  | GetDecisionTablePreviewAction
  | GetDecisionTablePreviewSuccessAction
  | CreateDecisionTableWithTriggersAction
  | CreateDecisionTableAction
  | CreateDecisionTableSuccessAction
  | UpdateDecisionTableAction
  | UpdateDecisionTableSuccessAction
  | PatchDecisionTableAction
  | DeleteDecisionTableAction
  | DeleteDecisionTableSuccessAction
  | AddDecisionTableToChapterAction
  | RemoveDecisionTableFromChapterAction
  | SetDecisionTablesLoadedAction
  | RunDecisionTableRuleAction
  | ClearDecisionTablesAction;
