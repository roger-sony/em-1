import {DecisionTableFactDto} from './decision-table.dto';
import {FactFilterDto} from './fact-filter.dto';
import {RuleResultDto} from './rule-result.dto';

export interface DecisionTablePreviewDto {
  dtableID: string;
  display_name: string;
  ref_fact: DecisionTableFactDto[];
  table_rules: DecisionTablePreviewRuleDto[];
  triggerActions: boolean;
}

export interface DecisionTablePreviewRuleDto {
  config_name: string;
  consequence: string;
  fact_filter: FactFilterDto[];
  ruleResults: RuleResultDto;
  conditionMet: boolean;
}
