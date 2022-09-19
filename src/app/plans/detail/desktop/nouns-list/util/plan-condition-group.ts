import {DecisionTableFact, DecisionTableRule} from '../../../../../core/model/decision-table';

export interface PlanConditionGroup {
  global?: boolean;
  name: string;
  facts?: DecisionTableFact[];
  factIndexes?: number[];
  rules?: DecisionTableRule[];
  ruleIndexes?: number[];
  adding?: boolean;
}
