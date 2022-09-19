import {TaskDto} from './task.dto';

export interface TaskInstanceDto extends TaskDto {
  startDateTime: string;
}
