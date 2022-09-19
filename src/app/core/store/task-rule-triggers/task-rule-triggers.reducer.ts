import {TaskRuleTriggersAction, TaskRuleTriggersActionType} from './task-rule-triggers.action';
import {initialTaskRuleTriggersState, taskRuleTriggersAdapter, TaskRuleTriggersState} from './task-rule-triggers.state';

export function taskRuleTriggersReducer(
  state: TaskRuleTriggersState = initialTaskRuleTriggersState,
  action: TaskRuleTriggersAction
): TaskRuleTriggersState {
  switch (action.type) {
    case TaskRuleTriggersActionType.GET_ALL_SUCCESS:
      return taskRuleTriggersAdapter.setAll(action.payload.triggers, state);
    case TaskRuleTriggersActionType.GET_SINGLE_SUCCESS:
      return taskRuleTriggersAdapter.upsertOne(action.payload.trigger, state);
    case TaskRuleTriggersActionType.CREATE_SUCCESS:
      return taskRuleTriggersAdapter.addOne(action.payload.trigger, state);
    case TaskRuleTriggersActionType.DELETE_SUCCESS:
      return taskRuleTriggersAdapter.removeOne(action.payload.id, state);
    case TaskRuleTriggersActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case TaskRuleTriggersActionType.CLEAR:
      return initialTaskRuleTriggersState;
    default:
      return state;
  }
}
