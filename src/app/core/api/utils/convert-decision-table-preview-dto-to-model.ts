import {DecisionTablePreview, DecisionTablePreviewRule, RuleResult} from '../../model/decision-table-preview';
import {DecisionTablePreviewDto, DecisionTablePreviewRuleDto} from '../dto/decision-table-preview.dto';
import {convertDecisionTableFactDtoToModel} from './convert-decision-table-dto-to-model';
import {RuleResultDto} from '../dto/rule-result.dto';

export function convertDecisionTablePreviewDtoToModel(dto: DecisionTablePreviewDto): DecisionTablePreview {
  return {
    decisionTableId: dto.dtableID,
    displayName: dto.display_name,
    facts: (dto.ref_fact || []).map(fact => convertDecisionTableFactDtoToModel(fact)),
    rules: (dto.table_rules || []).map(rule => convertDecisionTablePreviewRuleDtoToModel(rule)),
    triggerActions: dto.triggerActions,
  };
}

function convertDecisionTablePreviewRuleDtoToModel(ruleDto: DecisionTablePreviewRuleDto): DecisionTablePreviewRule {
  return {
    conditionMet: ruleDto.conditionMet,
    configName: ruleDto.config_name,
    consequence: ruleDto.consequence,
    factFilters: ruleDto.fact_filter,
    ruleResult: ruleDto.ruleResults && convertRuleResultDtoToModel(ruleDto.ruleResults),
  };
}

function convertRuleResultDtoToModel(ruleResultDto: RuleResultDto): RuleResult {
  return {
    id: ruleResultDto._id,
    lastUpdated: ruleResultDto.last_updated && new Date(ruleResultDto.last_updated),
    quantity: ruleResultDto.qty,
    unitOfMeasures: ruleResultDto.unit_of_measure,
  };
}
