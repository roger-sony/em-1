import {Action} from '@ngrx/store';
import {FactFilter} from '../../model/fact-filter';
import {FieldValues} from '../../model/field-values';
import {Paragraph} from '../../model/paragraph';
import {Task} from '../../model/task';
import {ParagraphInstance} from '../../model/task-instance';
import {TaskRuleTrigger} from '../../model/task-rule-trigger';
import {Sentence} from './../../model/sentence';

export enum TasksActionType {
  GET = '[Tasks] Get',
  GET_SUCCESS = '[Tasks] Get :: Success',

  GET_INSTANCES = '[Tasks] Get Task Instances',
  GET_INSTANCES_SUCCESS = '[Tasks] Get Task Instances :: Success',

  GET_ALL_FIELD_VALUES = '[Tasks] Get All Field Values',
  GET_ALL_FIELD_VALUES_SUCCESS = '[Tasks] Get All Field Values :: Success',

  CREATE = '[Tasks] Create',
  CREATE_SUCCESS = '[Tasks] Create :: Success',

  UPDATE = '[Tasks] Update',
  UPDATE_SUCCESS = '[Tasks] Update :: Success',

  DELETE = '[Tasks] Delete',
  DELETE_SUCCESS = '[Tasks] Delete :: Success',

  ADD_TO_CHAPTER = '[Tasks] Add To Chapter',
  ADD_TO_CHAPTER_SUCCESS = '[Tasks] Add To Chapter :: Success',

  REMOVE_FROM_CHAPTER = '[Tasks] Remove From Chapter',
  REMOVE_FROM_CHAPTER_SUCCESS = '[Tasks] Remove From Chapter :: Success',

  SET_LOADED = '[Tasks] Set Loaded',
  SET_INSTANCES_LOADED = '[Tasks] Set Instances Loaded',

  UPDATE_TASK_RULE_TRIGGERS = '[Tasks] Update Task Rule Triggers',
  CLEAR_TASK_RULE_TRIGGERS = '[Tasks] Clear Task Rule Triggers',

  UPDATE_FACTS = '[Tasks] Update Facts',
  CLEAR_FACTS = '[Tasks] Clear Facts',

  UPDATE_SUBTASKS = '[Tasks] Update Subtasks',
  CLEAR_SUBTASKS = '[Tasks] Clear Subtasks',

  CLEAR = '[Tasks] Clear',
}

export class GetTasksAction implements Action {
  public readonly type = TasksActionType.GET;

  public constructor(
    public payload: {
      force?: boolean;
      onSuccess?: (tasks: Task[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetTasksSuccessAction implements Action {
  public readonly type = TasksActionType.GET_SUCCESS;

  public constructor(public payload: {tasks: Task[]}) {}
}

export class GetTaskInstancesAction implements Action {
  public readonly type = TasksActionType.GET_INSTANCES;

  public constructor(
    public payload: {
      force?: boolean;
      onSuccess?: (taskInstances: Paragraph[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetTaskInstancesSuccessAction implements Action {
  public readonly type = TasksActionType.GET_INSTANCES_SUCCESS;

  public constructor(public payload: {taskInstances: ParagraphInstance[]}) {}
}

export class GetAllTaskFieldValuesAction implements Action {
  public readonly type = TasksActionType.GET_ALL_FIELD_VALUES;

  public constructor(
    public payload: {
      onSuccess?: (fieldValues: FieldValues) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllTaskFieldValuesSuccessAction implements Action {
  public readonly type = TasksActionType.GET_ALL_FIELD_VALUES_SUCCESS;

  public constructor(public payload: {fieldValues: FieldValues}) {}
}

export class CreateTaskAction implements Action {
  public readonly type = TasksActionType.CREATE;

  public constructor(
    public payload: {
      task: Task;
      onSuccess?: (task: Task) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateTaskSuccessAction implements Action {
  public readonly type = TasksActionType.CREATE_SUCCESS;

  public constructor(public payload: {task: Task}) {}
}

export class UpdateTaskAction implements Action {
  public readonly type = TasksActionType.UPDATE;

  public constructor(
    public payload: {
      taskId: string;
      taskChange: Partial<Task>;
      onSuccess?: (task: Task) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdateTaskSuccessAction implements Action {
  public readonly type = TasksActionType.UPDATE_SUCCESS;

  public constructor(public payload: {task: Task}) {}
}

export class DeleteTaskAction implements Action {
  public readonly type = TasksActionType.DELETE;

  public constructor(
    public payload: {
      taskId: string;
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteTaskSuccessAction implements Action {
  public readonly type = TasksActionType.DELETE_SUCCESS;

  public constructor(public payload: {taskId: string}) {}
}

export class AddTaskToChapterAction implements Action {
  public readonly type = TasksActionType.ADD_TO_CHAPTER;

  public constructor(
    public payload: {
      taskId: string;
      chapterId: string;
      onSuccess?: (task: Task) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class AddTaskToChapterSuccessAction implements Action {
  public readonly type = TasksActionType.ADD_TO_CHAPTER_SUCCESS;

  public constructor(public payload: {task: Task}) {}
}

export class RemoveTaskFromChapterAction implements Action {
  public readonly type = TasksActionType.REMOVE_FROM_CHAPTER;

  public constructor(
    public payload: {
      taskId: string;
      chapterId: string;
      onSuccess?: (task: Task) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class RemoveTaskFromChapterSuccessAction implements Action {
  public readonly type = TasksActionType.REMOVE_FROM_CHAPTER_SUCCESS;

  public constructor(public payload: {task: Task}) {}
}

export class SetTasksLoadedAction implements Action {
  public readonly type = TasksActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class SetTaskInstancesLoadedAction implements Action {
  public readonly type = TasksActionType.SET_INSTANCES_LOADED;

  public constructor(public payload: {instancesLoaded: boolean}) {}
}

export class UpdateTaskRuleTriggersAction implements Action {
  public readonly type = TasksActionType.UPDATE_TASK_RULE_TRIGGERS;

  public constructor(public payload: {taskRuleTriggers: TaskRuleTrigger[]}) {}
}

export class ClearTaskRuleTriggersAction implements Action {
  public readonly type = TasksActionType.CLEAR_TASK_RULE_TRIGGERS;
}

export class UpdateFactsAction implements Action {
  public readonly type = TasksActionType.UPDATE_FACTS;

  public constructor(public payload: {facts: FactFilter[]}) {}
}

export class ClearFactsAction implements Action {
  public readonly type = TasksActionType.CLEAR_FACTS;
}

export class UpdateSubtasksAction implements Action {
  public readonly type = TasksActionType.UPDATE_SUBTASKS;

  //TODO: Variable name
  public constructor(public payload: {subtasks: Sentence[]}) {}
}

export class ClearSubtasksAction implements Action {
  public readonly type = TasksActionType.CLEAR_SUBTASKS;
}

export class ClearTasksAction implements Action {
  public readonly type = TasksActionType.CLEAR;
}

export type TasksAction =
  | GetTasksAction
  | GetTasksSuccessAction
  | GetTaskInstancesAction
  | GetTaskInstancesSuccessAction
  | GetAllTaskFieldValuesAction
  | GetAllTaskFieldValuesSuccessAction
  | CreateTaskAction
  | CreateTaskSuccessAction
  | UpdateTaskAction
  | UpdateTaskSuccessAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction
  | AddTaskToChapterAction
  | AddTaskToChapterSuccessAction
  | RemoveTaskFromChapterAction
  | RemoveTaskFromChapterSuccessAction
  | SetTasksLoadedAction
  | SetTaskInstancesLoadedAction
  | UpdateTaskRuleTriggersAction
  | ClearTaskRuleTriggersAction
  | UpdateFactsAction
  | ClearFactsAction
  | UpdateSubtasksAction
  | ClearSubtasksAction
  | ClearTasksAction;
