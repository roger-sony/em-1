import {TaskRuleTrigger} from '../../model/task-rule-trigger';
import {TaskRuleTriggerDto} from '../dto/task-rule-trigger.dto';

export function convertTaskRuleTriggerDtoToModel(dto: TaskRuleTriggerDto): TaskRuleTrigger {
  return (
    dto && {
      displayName: dto.display_name,
      id: dto._id,
      ruleId: dto.ruleId,
      saveReport: dto.saveReport,
      taskEvent: dto.taskEvent,
      taskId: dto.taskId,
      triggerActions: dto.triggerActions,
    }
  );
}
