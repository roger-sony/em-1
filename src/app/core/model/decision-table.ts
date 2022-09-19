import {FactFilter} from './fact-filter';
import {PlanCondition} from './plan-condition';
import {RuleSchedule} from './rule-schedule';

export interface DecisionTable {
  id?: string;
  chapterIds?: string[];
  displayName: string;
  facts: DecisionTableFact[];
  rules: DecisionTableRule[];
  runFromCurrentSked?: boolean;
  nounCount?: number;
  conditionCount?: number;
  triggerCount?: number;
  cadence?: Date;
  cadences?: RuleSchedule[];
  newTableRules?: PlanCondition[];
}

export interface DecisionTableFact {
  displayName?: string;
  name: string;
  operation: string;
  value: string;
}

export interface DecisionTableRule {
  configName: string;
  consequence?: string;
  factFilters?: FactFilter[];
  sked?: string;
}
