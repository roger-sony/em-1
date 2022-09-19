import {convertTaskDtoToModel} from './convert-task-dto-to-model';
import {TaskInstanceDto} from '../dto/task-instance.dto';
import {TaskInstance} from '../../model/task-instance';

export function convertTaskInstanceDtoToModel(dto: TaskInstanceDto): TaskInstance {
  return {
    ...convertTaskDtoToModel(dto),
    startDateTime: dto.startDateTime ? new Date(dto.startDateTime) : null,
  };
}
