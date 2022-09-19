import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {FactFilter} from '../../model/fact-filter';
import {FieldValues} from '../../model/field-values';
import {Task} from '../../model/task';
import {ParagraphInstance} from '../../model/task-instance';
import {TaskRuleTrigger} from '../../model/task-rule-trigger';
import {Sentence} from './../../model/sentence';

export interface TasksState extends EntityState<Task> {
  fieldValues: FieldValues;
  loaded: boolean;
  taskInstances: ParagraphInstance[];
  taskRuleTriggers: TaskRuleTrigger[];
  //TODO: Variable name
  // subtasks: Subtask[];
  subtasks: Sentence[];
  facts: FactFilter[];
}

export const tasksAdapter = createEntityAdapter<Task>();

export const initialTasksState: TasksState = tasksAdapter.getInitialState({
  fieldValues: null,
  loaded: false,
  taskInstances: null,
  taskRuleTriggers: null,
  subtasks: null,
  facts: null,
});
