import {SentenceDto} from './sentence.dto';
import {CadenceFormDto} from './cadence-form.dto';
import {FactFilterDto} from './fact-filter.dto';
import {TaskRuleTriggerDto} from './task-rule-trigger.dto';

export interface TaskDto {
  recipes: TaskRecipeDto[];
  assignedTo: string[];
  assignedToUser: string[];
  //TODO: Variable name
  subtasks: SentenceDto[];
  ref_fact?: FactFilterDto[];
  checkList?: TaskCheckListItemDto[];
  cadence: CadenceFormDto[];
  _id: string;
  taskID: string;
  displayName: string;
  shortTask: string;
  category: string;
  location?: string;
  effort: number;
  priority: number;
  movability: number;
  unpleasantness?: number;
  abandon: boolean;
  instructions?: string;
  _chapterIDs: string[];
  ruleTriggers?: TaskRuleTriggerDto[];
  conditionCount?: number;
  triggerCount?: number;
}

export interface TaskRecipeDto {
  displayName: string;
  ingredients: TaskRecipeItemDto[];
  consumes: TaskRecipeItemDto[];
  instructions: string[];
}

export interface TaskRecipeItemDto {
  item: string;
  qty: number;
}

export interface SubtaskDto {
  verb: string;
  config_name: string;
  fact_filter: FactFilterDto[];
}

export interface TaskCheckListItemDto {
  displayValue: string;
  value: boolean;
}
