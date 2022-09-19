import {Action} from '@ngrx/store';
import {CadenceForm, CadenceFormPage} from '../../model/form/cadence-form';
import {PlanForm} from '../../model/form/plan-form';
import {TaskForm} from '../../model/form/task-form';
import {TriggerForm} from '../../model/form/trigger-form';
import {ChapterForm} from '../../model/form/chapter-form';

export enum FormsActionType {
  UPDATE_CADENCE = '[Forms] Update Cadence Form',
  UPDATE_CADENCE_SUCCESS = '[Forms] Update Cadence Form :: Success',
  CLEAR_CADENCE = '[Forms] Clear Cadence Form',

  UPDATE_PLAN = '[Forms] Update Plan Form',
  CLEAR_PLAN = '[Forms] Clear Plan Form',

  UPDATE_TASK = '[Forms] Update Task Form',
  CLEAR_TASK = '[Forms] Clear Task Form',

  UPDATE_TRIGGER = '[Forms] Update Trigger Form',
  UPDATE_TRIGGER_SUCCESS = '[Forms] Update Trigger Form :: Success',
  CLEAR_TRIGGER = '[Forms] Clear Trigger Form',

  UPDATE_CHAPTER = '[Forms] Update Chapter Form',
  CLEAR_CHAPTER = '[Forms] Clear Chapter Form',

  UPDATE_TASK_FORM_EDITED = '[Forms] Update Task Form Edited',

  CLEAR_ALL = '[Forms] Clear All',
}

export class UpdateCadenceFormAction implements Action {
  public readonly type = FormsActionType.UPDATE_CADENCE;

  public constructor(public payload: {cadenceForm: CadenceForm; page?: CadenceFormPage}) {}
}

export class UpdateCadenceFormSuccessAction implements Action {
  public readonly type = FormsActionType.UPDATE_CADENCE_SUCCESS;

  public constructor(public payload: {cadenceForm: CadenceForm}) {}
}

export class ClearCadenceFormAction implements Action {
  public readonly type = FormsActionType.CLEAR_CADENCE;
}

export class UpdatePlanFormAction implements Action {
  public readonly type = FormsActionType.UPDATE_PLAN;

  public constructor(public payload: {planForm: PlanForm}) {}
}

export class ClearPlanFormAction implements Action {
  public readonly type = FormsActionType.CLEAR_PLAN;
}

export class UpdateTaskFormAction implements Action {
  public readonly type = FormsActionType.UPDATE_TASK;

  public constructor(public payload: {taskForm: TaskForm}) {}
}

export class ClearTaskFormAction implements Action {
  public readonly type = FormsActionType.CLEAR_TASK;
}
export class UpdateTriggerFormAction implements Action {
  public readonly type = FormsActionType.UPDATE_TRIGGER;

  public constructor(public payload: {triggerForm: TriggerForm}) {}
}

export class UpdateTriggerFormSuccessAction implements Action {
  public readonly type = FormsActionType.UPDATE_TRIGGER_SUCCESS;

  public constructor(public payload: {triggerForm: TriggerForm}) {}
}

export class UpdateChapterFormAction implements Action {
  public readonly type = FormsActionType.UPDATE_CHAPTER;

  public constructor(public payload: {chapterForm: ChapterForm}) {}
}

export class UpdateTaskFormEditedAction implements Action {
  public readonly type = FormsActionType.UPDATE_TASK_FORM_EDITED;

  public constructor(public payload: {taskFormEdited: boolean}) {}
}

export class ClearChapterFormAction implements Action {
  public readonly type = FormsActionType.CLEAR_CHAPTER;
}

export class ClearTriggerFormAction implements Action {
  public readonly type = FormsActionType.CLEAR_TRIGGER;
}

export class ClearAllFormsAction implements Action {
  public readonly type = FormsActionType.CLEAR_ALL;
}

export type FormsAction =
  | UpdateCadenceFormAction
  | UpdateCadenceFormSuccessAction
  | ClearCadenceFormAction
  | UpdatePlanFormAction
  | ClearPlanFormAction
  | UpdateTaskFormAction
  | ClearTaskFormAction
  | UpdateTriggerFormAction
  | UpdateTriggerFormSuccessAction
  | UpdateChapterFormAction
  | UpdateTaskFormEditedAction
  | ClearChapterFormAction
  | ClearTriggerFormAction
  | ClearAllFormsAction;
