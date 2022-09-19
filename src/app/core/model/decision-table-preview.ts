import {FactFilterDto} from '../api/dto/fact-filter.dto';
import {DecisionTableFact} from './decision-table';
import {Quantity} from './quantity';

export interface DecisionTablePreview {
  decisionTableId: string;
  displayName: string;
  facts: DecisionTableFact[];
  rules: DecisionTablePreviewRule[];
  triggerActions: boolean;
}

export interface DecisionTablePreviewRule {
  configName: string;
  consequence: string;
  factFilters: FactFilterDto[];
  ruleResult: RuleResult;
  conditionMet: boolean;
}

export interface RuleResult {
  id: RuleResultId;
  quantity: Quantity;
  lastUpdated: Date;
  unitOfMeasures: string[];
}

export interface RuleResultId {
  subcategory: string;
}
