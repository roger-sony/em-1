import {NounRuleTrigger} from '../../model/noun-rule-trigger';
import {NounRuleTriggerDto} from '../dto/noun-rule-trigger.dto';

export function convertNounRuleTriggerDtoToModel(dto: NounRuleTriggerDto): NounRuleTrigger {
  return {
    displayName: dto.displayName,
    id: dto._id,
    nounSubcategory: dto.nounSubcategory,
    ruleId: dto.ruleId,
    saveReport: dto.saveReport,
    triggerActions: dto.triggerActions,
  };
}
