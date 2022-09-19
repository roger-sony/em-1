import {createEntityAdapter} from '@ngrx/entity';
import {
  dummyProjectTemplates,
  dummyTasksTemplates,
  ProjectTemplateModel,
  TaskModel,
} from './project-builder-dummy-data';

export interface ProjectBuilderState {
  currentProject: ProjectTemplateModel;
  hasUnsavedChanges: boolean;
  saveInProgress: boolean;
  projectTemplates: ProjectTemplateModel[];
  tabIndex: number;
  taskTemplates: TaskModel[];
  type: 'horizontal' | 'vertical';
}

export const projectBuilderAdapter = createEntityAdapter<ProjectBuilderState>();

export const initialProjectBuilderState: ProjectBuilderState = projectBuilderAdapter.getInitialState({
  currentProject: null, // dummySceneTemplates[0],
  hasUnsavedChanges: false,
  saveInProgress: false,
  projectTemplates: dummyProjectTemplates,
  taskTemplates: dummyTasksTemplates,
  tabIndex: 1,
  type: 'horizontal',
});
