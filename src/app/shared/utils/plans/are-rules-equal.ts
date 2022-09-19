import {DecisionTableRule} from '../../../core/model/decision-table';
import {areFactsEqual} from './are-facts-equal';

export function areRulesEqual(rule1: DecisionTableRule, rule2: DecisionTableRule): boolean {
  if (
    rule1?.consequence !== rule2?.consequence ||
    rule1?.sked !== rule2?.sked ||
    rule1?.factFilters?.length !== rule2.factFilters?.length
  ) {
    return false;
  }

  return rule1?.factFilters.every((fact, index) => areFactsEqual(fact, rule2?.factFilters[index]));
}
