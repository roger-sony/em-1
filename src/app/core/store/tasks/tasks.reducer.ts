import {TasksAction, TasksActionType} from './tasks.action';
import {initialTasksState, tasksAdapter, TasksState} from './tasks.state';

export function tasksReducer(state: TasksState = initialTasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case TasksActionType.GET_SUCCESS:
      return tasksAdapter.setAll(action.payload.tasks, state);
    case TasksActionType.GET_INSTANCES_SUCCESS:
      return {...state, taskInstances: action.payload.taskInstances};
    case TasksActionType.GET_ALL_FIELD_VALUES_SUCCESS:
      return {...state, fieldValues: action.payload.fieldValues};
    case TasksActionType.CREATE_SUCCESS:
      return tasksAdapter.addOne(action.payload.task, state);
    case TasksActionType.DELETE:
      return tasksAdapter.removeOne(action.payload.taskId, state);
    case TasksActionType.ADD_TO_CHAPTER_SUCCESS:
    case TasksActionType.REMOVE_FROM_CHAPTER_SUCCESS:
      return tasksAdapter.upsertOne(action.payload.task, state);
    case TasksActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case TasksActionType.UPDATE_TASK_RULE_TRIGGERS:
      return {...state, taskRuleTriggers: action.payload.taskRuleTriggers};
    case TasksActionType.CLEAR_TASK_RULE_TRIGGERS:
      return {...state, taskRuleTriggers: null};
    case TasksActionType.UPDATE_FACTS:
      return {...state, facts: action.payload.facts};
    case TasksActionType.CLEAR_FACTS:
      return {...state, facts: null};
    case TasksActionType.UPDATE_SUBTASKS:
      return {...state, subtasks: action.payload.subtasks};
    case TasksActionType.CLEAR_SUBTASKS:
      return {...state, subtasks: null};
    case TasksActionType.CLEAR:
      return initialTasksState;
    default:
      return state;
  }
}
