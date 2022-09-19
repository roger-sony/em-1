import {SkedTemplate, SkedTemplateTask} from '../../model/sked-template';
import {SkedTemplateDto, SkedTemplateTaskDto} from '../dto/sked-template.dto';

export function convertSkedTemplateDtoToModel(dto: SkedTemplateDto): SkedTemplate {
  return {
    id: dto._id,
    displayName: dto.displayName,
    skedId: dto._SkedID,
    startTime: dto._StartTime,
    endTime: dto._EndTime,
    assignedEmployees: dto.assignedEmployees,
    tasks: (dto.tasks || []).map(task => convertSkedTemplateTaskDtoToModel(task)),
    balanced: dto.balanced,
  };
}

function convertSkedTemplateTaskDtoToModel(dto: SkedTemplateTaskDto): SkedTemplateTask {
  return {
    id: dto._id,
    displayName: dto.displayName,
    status: dto.status,
    weight: dto.weight,
    weightedDuration: dto.weightedDuration,
  };
}
