import {DecisionTablePreview, DecisionTablePreviewRule, RuleResult} from '../../model/decision-table-preview';
import {
  DecisionTablePreviewDtoChange,
  DecisionTablePreviewRuleDtoChange,
  RuleResultDtoChange,
} from '../dto/decision-table-preview-change.dto';
import {DecisionTableFact} from '../../model/decision-table';
import {DecisionTableFactDto} from '../dto/decision-table.dto';

export function convertDecisionTablePreviewModelToDto(preview: DecisionTablePreview): DecisionTablePreviewDtoChange {
  return {
    dtableID: preview.decisionTableId,
    display_name: preview.displayName,
    ref_fact: (preview.facts || []).map(fact => convertDecisionTableFactModelToDto(fact)),

    table_rules: (preview.rules || []).map(rule => convertDecisionTablePreviewRuleModelToDto(rule)),
    triggerActions: preview.triggerActions,
  };
}

function convertDecisionTablePreviewRuleModelToDto(rule: DecisionTablePreviewRule): DecisionTablePreviewRuleDtoChange {
  return {
    conditionMet: rule.conditionMet,
    config_name: rule.configName,
    consequence: rule.consequence,
    fact_filter: rule.factFilters,
    ruleResults: rule.ruleResult && convertRuleResultModelToDto(rule.ruleResult),
  };
}

function convertRuleResultModelToDto(ruleResult: RuleResult): RuleResultDtoChange {
  return {
    _id: ruleResult.id,
    last_updated: ruleResult.lastUpdated && new Date(ruleResult.lastUpdated).toString(),
    qty: parseFloat(ruleResult.quantity.$numberDecimal),
    unit_of_measure: ruleResult.unitOfMeasures,
  };
}

export function convertDecisionTableFactModelToDto(fact: DecisionTableFact): DecisionTableFactDto {
  return {
    display_name: fact.displayName,
    name: fact.name,
    operation: fact.operation,
    value: fact.value,
  };
}
