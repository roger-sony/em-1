import {DecisionTable} from '../../../../../core/model/decision-table';
import {PlanConditionGroup} from './plan-condition-group';

export const GLOBAL_CONDITION_NAME = 'Global Condition';

export function createGlobalConditionGroup(plan: DecisionTable, adding?: boolean): PlanConditionGroup {
  return plan.facts.reduce<PlanConditionGroup>(
    (group, fact, index) => {
      if (fact.name !== '__v') {
        group.facts.push(fact);
        group.factIndexes.push(index);
      }
      return group;
    },
    {
      global: true,
      name: GLOBAL_CONDITION_NAME,
      facts: [],
      factIndexes: [],
      adding,
    }
  );
}
