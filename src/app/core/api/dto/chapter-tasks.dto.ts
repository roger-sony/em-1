import {TaskDto} from './task.dto';

export interface ChapterTasksDto {
  dtableCount: number;
  inventoryCount: number;
  taskCount: number;
  tasks: TaskDto[];
}
