import {initialProjectBuilderState, ProjectBuilderState} from './project-builder.state';
import {ProjectBuilderAction, ProjectBuilderActionType} from './project-builder.action';
import {dummyProjectTemplates, dummyTasksTemplates} from './project-builder-dummy-data';

export function projectBuilderReducer(
  state: ProjectBuilderState = initialProjectBuilderState,
  action: ProjectBuilderAction
): ProjectBuilderState {
  switch (action.type) {
    case ProjectBuilderActionType.ADD_PROJECT_TEMPLATE:
      return {...state, projectTemplates: [...state.projectTemplates, action.payload]};
    case ProjectBuilderActionType.CLEAR_PROJECT_BUILDER:
      return {
        ...state,
        currentProject: null,
        hasUnsavedChanges: false,
        projectTemplates: dummyProjectTemplates,
        taskTemplates: dummyTasksTemplates,
        tabIndex: 1,
        type: 'horizontal',
      };
    case ProjectBuilderActionType.CREATE_PROJECT_SUCCESS:
      const newProject = {
        ...action.payload.project,
        id: state.projectTemplates.length + 1,
      };

      return {
        ...state,
        projectTemplates: [...state.projectTemplates, newProject],
        currentProject: newProject,
        hasUnsavedChanges: true,
      };
    case ProjectBuilderActionType.CREATE_TASK_SUCCESS:
      return {...state, taskTemplates: [...state.taskTemplates, action.payload.task]};
    case ProjectBuilderActionType.SAVE_CURRENT_PROJECT_SUCCESS:
      return {
        ...state,
        currentProject: action.payload.project,
        hasUnsavedChanges: false,
        projectTemplates: state.projectTemplates.map(s => {
          if (s.id === action.payload.project?.id) {
            return action.payload.project;
          }

          return s;
        }),
      };
    case ProjectBuilderActionType.REMOVE_CURRENT_PROJECT:
      console.log(state.currentProject);
      return {
        ...state,
        projectTemplates: state.projectTemplates.filter(s => s.id !== state.currentProject.id),
      };
    case ProjectBuilderActionType.SET_SAVE_IN_PROGRESS:
      return {...state, saveInProgress: action.payload.saveInProgress};
    case ProjectBuilderActionType.SET_CURRENT_PROJECT:
      return {...state, currentProject: state.projectTemplates.find(t => t.id === action.payload.id)};
    case ProjectBuilderActionType.SET_TAB_INDEX:
      return {...state, tabIndex: action.payload.tabIndex};
    case ProjectBuilderActionType.SET_TYPE:
      return {...state, type: action.payload.type};
    case ProjectBuilderActionType.UPDATE_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: action.payload.project,
        projectTemplates: state.projectTemplates.map(s => {
          if (s.id === action.payload.project.id) {
            return action.payload.project;
          }

          return s;
        }),
        hasUnsavedChanges: true,
      };
    default:
      return state;
  }
}
