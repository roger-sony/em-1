import {RuleSchedule} from '../../model/rule-schedule';
import {RuleScheduleDto} from '../dto/rule-schedule.dto';

export function convertRuleScheduleModelToDto(model: RuleSchedule): RuleScheduleDto {
  return {
    _id: model.id,
    displayName: model.displayName,
    rule: model.ruleId,
    saveReport: model.saveReport,
    schedule: model.schedule,
    triggerActions: model.triggerActions,
    startDate: model.startDate?.toISOString(),
    endDate: model.endDate?.toISOString(),
    numberOfSkeds: model.numberOfSkeds,
  };
}
