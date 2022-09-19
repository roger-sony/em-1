import {DecisionTable, DecisionTableFact, DecisionTableRule} from '../../model/decision-table';
import {DecisionTableDto, DecisionTableFactDto, DecisionTableRuleDto} from '../dto/decision-table.dto';

export function convertDecisionTableModelToDto(model: DecisionTable): DecisionTableDto {
  return {
    _id: model.id,
    _chapterIDs: model.chapterIds || [],
    display_name: model.displayName,
    ref_fact: (model.facts || []).map(fact => convertDecisionTableFactModelToDto(fact)),
    table_rules: (model.rules || []).map(rule => convertDecisionTableRuleModelToDto(rule)),
    runFromCurrentSked: model.runFromCurrentSked,
    new_table_rules: model.newTableRules || [],
  };
}

function convertDecisionTableFactModelToDto(factModel: DecisionTableFact): DecisionTableFactDto {
  return {
    display_name: factModel.displayName,
    name: factModel.name,
    operation: factModel.operation,
    value: factModel.value,
  };
}

function convertDecisionTableRuleModelToDto(ruleModel: DecisionTableRule): DecisionTableRuleDto {
  return {
    config_name: ruleModel.configName,
    consequence: ruleModel.consequence,
    fact_filter: ruleModel.factFilters,
    sked: ruleModel.sked,
  };
}
