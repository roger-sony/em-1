import {FactFilter} from '../fact-filter';
import {Sentence} from '../sentence';
export interface TaskForm {
  name: string;
  skedTemplateIds: string[];
  effort?: number;
  priority: number;
  movability: number;
  instructions: string;
  roles: string[];
  users: string[];
  category: string;
  location: string;
  chapterIds: string[];
  upPoints: number;
  //TODO: Variable name
  // subtasks?: Subtask[];
  subtasks?: Sentence[];
  facts?: FactFilter[];
}
