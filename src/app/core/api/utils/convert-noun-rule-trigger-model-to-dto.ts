import {NounRuleTrigger} from '../../model/noun-rule-trigger';
import {NounRuleTriggerDto} from '../dto/noun-rule-trigger.dto';

export function convertNounRuleTriggerModelToDto(model: NounRuleTrigger): NounRuleTriggerDto {
  return {
    _id: model.id,
    displayName: model.displayName,
    nounSubcategory: model.nounSubcategory,
    ruleId: model.ruleId,
    saveReport: model.saveReport,
    triggerActions: model.triggerActions,
  };
}
