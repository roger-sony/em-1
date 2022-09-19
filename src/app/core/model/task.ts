import {Sentence} from './sentence';
import {FactFilter} from './fact-filter';
import {CadenceForm} from './form/cadence-form';
import {Role} from './role';
import {User} from './user';
import {TaskRuleTrigger} from './task-rule-trigger';

export interface Task {
  id?: string;
  taskId?: string;
  chapterIds?: string[];
  recipes?: TaskRecipe[];
  assignedTo?: string[];
  assignedToUser?: string[];
  //TODO: Variable name
  subtasks?: Sentence[];
  facts?: FactFilter[];
  checkList?: TaskCheckListItem[];
  displayName?: string;
  shortTask?: string;
  category?: string;
  location?: string;
  effort?: number;
  priority?: number;
  movability?: number;
  unpleasantness?: number;
  abandon?: boolean;
  instructions?: string;
  conditionCount?: number;
  triggerCount?: number;
  cadence?: CadenceForm[];
  ruleTriggers?: TaskRuleTrigger[];
}

export interface TaskFull {
  id?: string;
  taskId?: string;
  chapterIds?: string[];
  recipes?: TaskRecipe[];
  assignedTo?: Role[];
  assignedToUser?: User[];
  subtasks?: Subtask[];
  facts?: FactFilter[];
  checkList?: TaskCheckListItem[];
  displayName?: string;
  shortTask?: string;
  category?: string;
  location?: string;
  effort?: number;
  priority?: number;
  movability?: number;
  unpleasantness?: number;
  abandon?: boolean;
  instructions?: string;
  conditionCount?: number;
  triggerCount?: number;
  cadence?: CadenceForm[];
  subtasksString: string;
  usersAssigned: string;
  rolesAssigned: string;
}

export interface TaskRecipe {
  displayName: string;
  ingredients: TaskRecipeItem[];
  consumes: TaskRecipeItem[];
  instructions: string[];
}

export interface TaskRecipeItem {
  item: string;
  qty: number;
}

export interface Subtask {
  verb?: string;
  configName?: string;
  factFilters?: FactFilter[];
  activeOptions?: string[];
  inactiveOptions?: string[];
  filterValue?: string;
  filterName?: string;
  filterOperation?: string;
}

export interface TaskCheckListItem {
  displayValue: string;
  value: boolean;
}

export interface TaskTableColumn {
  name: string;
  checked: boolean;
}
