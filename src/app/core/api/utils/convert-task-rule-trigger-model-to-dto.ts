import {TaskRuleTrigger} from '../../model/task-rule-trigger';
import {TaskRuleTriggerDto} from '../dto/task-rule-trigger.dto';

export function convertTaskRuleTriggerModelToDto(model: TaskRuleTrigger): TaskRuleTriggerDto {
  return {
    _id: model.id,
    display_name: model.displayName,
    ruleId: model.ruleId,
    saveReport: model.saveReport,
    taskEvent: model.taskEvent,
    taskId: model.taskId,
    triggerActions: model.triggerActions,
  };
}
