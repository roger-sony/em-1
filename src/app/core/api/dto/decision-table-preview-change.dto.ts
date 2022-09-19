import {DecisionTableFactDto} from './decision-table.dto';
import {FactFilterDto} from './fact-filter.dto';

export interface DecisionTablePreviewDtoChange {
  dtableID: string;
  display_name: string;
  ref_fact: DecisionTableFactDto[];
  table_rules: DecisionTablePreviewRuleDtoChange[];
  triggerActions: boolean;
}

export interface DecisionTablePreviewRuleDtoChange {
  config_name: string;
  consequence: string;
  fact_filter: FactFilterDto[];
  ruleResults: RuleResultDtoChange;
  conditionMet: boolean;
}

export interface RuleResultDtoChange {
  _id: IdDto;
  qty: number;
  last_updated: string;
  unit_of_measure: string[];
}

export interface IdDto {
  subcategory: string;
}
