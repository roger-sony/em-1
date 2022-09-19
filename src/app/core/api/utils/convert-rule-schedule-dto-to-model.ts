import {RuleSchedule} from '../../model/rule-schedule';
import {RuleScheduleDto} from '../dto/rule-schedule.dto';

export function convertRuleScheduleDtoToModel(dto: RuleScheduleDto): RuleSchedule {
  return {
    displayName: dto.displayName,
    id: dto._id,
    ruleId: dto.rule,
    saveReport: dto.saveReport,
    schedule: dto.schedule,
    triggerActions: dto.triggerActions,
    startDate: dto.startDate ? new Date(dto.startDate) : null,
    endDate: dto.endDate ? new Date(dto.endDate) : null,
    numberOfSkeds: dto.numberOfSkeds,
  };
}
