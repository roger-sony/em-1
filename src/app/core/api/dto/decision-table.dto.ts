import {FactFilterDto} from './fact-filter.dto';
import {RuleScheduleDto} from './rule-schedule.dto';
import {RuleResultDto} from './rule-result.dto';
import {PlanCondition} from '../../model/plan-condition';

export interface DecisionTableDto {
  ref_fact: DecisionTableFactDto[];
  table_rules: DecisionTableRuleDto[];
  _id?: string;
  display_name: string;
  runFromCurrentSked?: boolean;
  _chapterIDs: string[];
  __v?: number;
  cadences?: RuleScheduleDto[];
  nounCount?: number;
  conditionCount?: number;
  triggerCount?: number;
  new_table_rules: PlanCondition[];
}

export interface DecisionTableFactDto {
  display_name?: string;
  name: string;
  operation: string;
  value: string;
}

export interface DecisionTableRuleDto {
  config_name: string;
  consequence: string;
  fact_filter: FactFilterDto[];
  sked?: string;
  ruleResults?: RuleResultDto;
  conditionMet?: boolean;
}
