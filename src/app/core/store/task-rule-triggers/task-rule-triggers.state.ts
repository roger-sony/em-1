import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {TaskRuleTrigger} from '../../model/task-rule-trigger';

export interface TaskRuleTriggersState extends EntityState<TaskRuleTrigger> {
  loaded: boolean;
}

export const taskRuleTriggersAdapter = createEntityAdapter<TaskRuleTrigger>();

export const initialTaskRuleTriggersState: TaskRuleTriggersState = taskRuleTriggersAdapter.getInitialState({
  loaded: false,
});
