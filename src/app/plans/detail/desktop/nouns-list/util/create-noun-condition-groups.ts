import {DecisionTable} from '../../../../../core/model/decision-table';
import {GLOBAL_CONDITION_NAME} from './create-global-condition-group';
import {PlanConditionGroup} from './plan-condition-group';

export function createNounConditionGroups(plan: DecisionTable, editedName?: string): PlanConditionGroup[] {
  const groupsMap = plan.rules.reduce<Record<string, PlanConditionGroup>>((groups, rule, index) => {
    if (groups[rule.configName]) {
      groups[rule.configName].rules.push(rule);
      groups[rule.configName].ruleIndexes.push(index);
    } else {
      groups[rule.configName] = {
        name: rule.configName,
        rules: [rule],
        ruleIndexes: [index],
        adding: rule.configName === editedName,
      };
    }
    return groups;
  }, {});

  if (editedName && editedName !== GLOBAL_CONDITION_NAME && !groupsMap[editedName]) {
    groupsMap[editedName] = {
      name: editedName,
      rules: [],
      ruleIndexes: [],
      adding: true,
    };
  }

  return Object.values(groupsMap);
}
