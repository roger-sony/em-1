import {DecisionTable, DecisionTableFact, DecisionTableRule} from '../../model/decision-table';
import {DecisionTableDto, DecisionTableFactDto, DecisionTableRuleDto} from '../dto/decision-table.dto';
import {convertRuleScheduleDtoToModel} from './convert-rule-schedule-dto-to-model';

export function convertDecisionTableDtoToModel(dto: DecisionTableDto): DecisionTable {
  return {
    id: dto._id,
    chapterIds: dto._chapterIDs || [],
    displayName: dto.display_name,
    facts: (dto.ref_fact || []).map(fact => convertDecisionTableFactDtoToModel(fact)),
    rules: (dto.table_rules || []).map(rule => convertDecisionTableRuleDtoToModel(rule)),
    runFromCurrentSked: dto.runFromCurrentSked,
    cadences: (dto.cadences || []).map(rule => convertRuleScheduleDtoToModel(rule)),
    conditionCount: dto.conditionCount || 0,
    triggerCount: dto.triggerCount || 0,
    nounCount: dto.nounCount || 0,
    newTableRules: dto.new_table_rules || [],
  };
}

export function convertDecisionTableFactDtoToModel(factDto: DecisionTableFactDto): DecisionTableFact {
  return {
    displayName: factDto.display_name,
    name: factDto.name,
    operation: factDto.operation,
    value: factDto.value,
  };
}

export function convertDecisionTableRuleDtoToModel(ruleDto: DecisionTableRuleDto): DecisionTableRule {
  return {
    configName: ruleDto.config_name,
    consequence: ruleDto.consequence,
    factFilters: ruleDto.fact_filter,
    sked: ruleDto.sked,
  };
}
