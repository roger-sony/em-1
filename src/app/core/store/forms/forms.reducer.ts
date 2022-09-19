import {FormsAction, FormsActionType} from './forms.action';
import {FormsState, initialFormsState} from './forms.state';

export function formsReducer(state: FormsState = initialFormsState, action: FormsAction): FormsState {
  switch (action.type) {
    case FormsActionType.UPDATE_CADENCE_SUCCESS:
      return {...state, cadence: action.payload.cadenceForm};
    case FormsActionType.CLEAR_CADENCE:
      return {...state, cadence: null};
    case FormsActionType.UPDATE_PLAN:
      return {...state, plan: action.payload.planForm};
    case FormsActionType.CLEAR_PLAN:
      return {...state, plan: null};
    case FormsActionType.UPDATE_TASK:
      return {...state, task: action.payload.taskForm};
    case FormsActionType.CLEAR_TASK:
      return {...state, task: null};
    case FormsActionType.UPDATE_TRIGGER_SUCCESS:
      return {...state, trigger: action.payload.triggerForm};
    case FormsActionType.CLEAR_TRIGGER:
      return {...state, trigger: null};
    case FormsActionType.UPDATE_TASK_FORM_EDITED:
      return {...state, taskFormEdited: action.payload.taskFormEdited};
    case FormsActionType.UPDATE_CHAPTER:
      return {...state, chapter: action.payload.chapterForm};
    case FormsActionType.CLEAR_CHAPTER:
      return {...state, chapter: null};
    case FormsActionType.CLEAR_ALL:
      return initialFormsState;
    default:
      return state;
  }
}
