import {Action} from '@ngrx/store';
import {ProjectTemplateModel, TaskModel} from './project-builder-dummy-data';

export enum ProjectBuilderActionType {
  ADD_PROJECT_TEMPLATE = '[Project Builder] Add Project Template',

  CLEAR_PROJECT_BUILDER = '[Project Builder] Clear Project Builder',

  CREATE_PROJECT = '[Project Builder] Create Project',
  CREATE_PROJECT_SUCCESS = '[Project Builder] Create Project :: Success',

  CREATE_TASK = '[Project Builder] Create task template',
  CREATE_TASK_SUCCESS = '[Project Builder] Create task template :: Success',

  GET_ALL_PROJECTS = '[Project Builder] Get Projects',
  GET_ALL_PROJECTS_SUCCESS = '[Project Builder] Get Projects :: Success',

  REMOVE_CURRENT_PROJECT = '[Project Builder] Remove Current Project',

  SAVE_CURRENT_PROJECT = '[Project Builder] Save Current Project',
  SAVE_CURRENT_PROJECT_SUCCESS = '[Project Builder] Save Current Project :: Success',

  SET_CURRENT_PROJECT = '[Project Builder] Set Current Project',

  SET_SAVE_IN_PROGRESS = '[Project Builder] Set Save in Progress',

  SET_TAB_INDEX = '[Project Builder] Set Tab Index',

  SET_TYPE = '[Project Builder] Set Type',

  SORT_PROJECT_TEMPLATES = '[Project Builder] Sort Project Templates',
  SORT_PROJECT_TEMPLATES_SUCCESS = '[Project Builder] Sort Project Templates :: Success',

  UPDATE_CURRENT_PROJECT = '[Project Builder] Update Current Project',
}

export class AddProjectTemplateAction implements Action {
  public readonly type = ProjectBuilderActionType.ADD_PROJECT_TEMPLATE;

  public constructor(public payload: ProjectTemplateModel) {}
}

export class ClearProjectBuilderAction implements Action {
  public readonly type = ProjectBuilderActionType.CLEAR_PROJECT_BUILDER;

  public constructor() {}
}

export class CreateProjectAction implements Action {
  public readonly type = ProjectBuilderActionType.CREATE_PROJECT;

  public constructor(
    public payload: {
      project: ProjectTemplateModel;
      onSuccess?: (project: ProjectTemplateModel) => void;
      // tslint:disable-next-line:no-any
      onError?: (e: any) => void;
    }
  ) {}
}

export class CreateProjectSuccessAction implements Action {
  public readonly type = ProjectBuilderActionType.CREATE_PROJECT_SUCCESS;

  public constructor(public payload: {project: ProjectTemplateModel}) {}
}

export class CreateTaskAction implements Action {
  public readonly type = ProjectBuilderActionType.CREATE_TASK;

  public constructor(
    public payload: {
      task: TaskModel;
      onSuccess?: () => void;
      // tslint:disable-next-line:no-any
      onError?: (e: any) => void;
    }
  ) {}
}

export class CreateTaskSuccessAction implements Action {
  public readonly type = ProjectBuilderActionType.CREATE_TASK_SUCCESS;

  public constructor(
    public payload: {
      task: TaskModel;
      onSuccess?: () => void;
      // tslint:disable-next-line:no-any
      onError?: (e: any) => void;
    }
  ) {}
}

export class GetAllProjectsAction implements Action {
  public readonly type = ProjectBuilderActionType.GET_ALL_PROJECTS;

  public constructor(
    public payload: {
      onSuccess: () => void;
    }
  ) {}
}

export class GetAllProjectsSuccessAction implements Action {
  public readonly type = ProjectBuilderActionType.GET_ALL_PROJECTS_SUCCESS;

  public constructor(public payload?: ProjectTemplateModel[]) {}
}

export class RemoveCurrentProject implements Action {
  public readonly type = ProjectBuilderActionType.REMOVE_CURRENT_PROJECT;

  public constructor() {}
}

export class SetSaveInProgressAction implements Action {
  public readonly type = ProjectBuilderActionType.SET_SAVE_IN_PROGRESS;

  public constructor(public payload: {saveInProgress: boolean}) {}
}

export class SetCurrentProjectAction implements Action {
  public readonly type = ProjectBuilderActionType.SET_CURRENT_PROJECT;

  public constructor(public payload: {id: string | number}) {}
}

export class SetProjectBuilderTypeAction implements Action {
  public readonly type = ProjectBuilderActionType.SET_TYPE;

  public constructor(public payload: {type: 'horizontal' | 'vertical'}) {}
}

export class SetProjectBuilderTabIndexAction implements Action {
  public readonly type = ProjectBuilderActionType.SET_TAB_INDEX;

  public constructor(public payload: {tabIndex: number}) {}
}

export class SortProjectTemplatesAction implements Action {
  public readonly type = ProjectBuilderActionType.SORT_PROJECT_TEMPLATES;

  public constructor() {}
}

export class SortProjectTemplatesSuccessAction implements Action {
  public readonly type = ProjectBuilderActionType.SORT_PROJECT_TEMPLATES_SUCCESS;

  public constructor(public payload: {projectTemplates: ProjectTemplateModel[]}) {}
}

export class UpdateCurrentProjectAction implements Action {
  public readonly type = ProjectBuilderActionType.UPDATE_CURRENT_PROJECT;

  public constructor(public payload: {project: ProjectTemplateModel}) {}
}

export class SaveCurrentProjectAction implements Action {
  public readonly type = ProjectBuilderActionType.SAVE_CURRENT_PROJECT;

  public constructor(public payload: {project: ProjectTemplateModel}) {}
}

export class SaveCurrentProjectSuccessAction implements Action {
  public readonly type = ProjectBuilderActionType.SAVE_CURRENT_PROJECT_SUCCESS;

  public constructor(public payload: {project: ProjectTemplateModel}) {}
}

export type ProjectBuilderAction =
  | AddProjectTemplateAction
  | ClearProjectBuilderAction
  | CreateTaskAction
  | CreateTaskSuccessAction
  | CreateProjectAction
  | CreateProjectSuccessAction
  | GetAllProjectsAction
  | RemoveCurrentProject
  | SaveCurrentProjectAction
  | SaveCurrentProjectSuccessAction
  | SetCurrentProjectAction
  | SetSaveInProgressAction
  | SetProjectBuilderTabIndexAction
  | SetProjectBuilderTypeAction
  | SortProjectTemplatesAction
  | SortProjectTemplatesSuccessAction
  | UpdateCurrentProjectAction;
