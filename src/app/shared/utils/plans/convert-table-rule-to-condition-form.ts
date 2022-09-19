import {ConditionForm} from '../../../core/model/condition-form';
import {PlanCondition} from '../../../core/model/plan-condition';

export function convertTableRuleToConditionForm(tableRule: PlanCondition): ConditionForm {
  const andCondition1 = tableRule.and.find(rule => rule.order === 1);
  const orCondition1 = tableRule.or.find(rule => rule.order === 1);
  const andCondition2 = tableRule.and.find(rule => rule.order === 2);
  const orCondition2 = tableRule.or.find(rule => rule.order === 2);
  const andCondition3 = tableRule.and.find(rule => rule.order === 3);
  const orCondition3 = tableRule.or.find(rule => rule.order === 3);

  let conjunction1, conjunction2;
  if (andCondition1 && andCondition3) {
    conjunction1 = conjunction2 = 'and';
  } else if (orCondition1 && orCondition3) {
    conjunction1 = conjunction2 = 'or';
  } else if (andCondition1 && orCondition3) {
    conjunction1 = 'and';
    conjunction2 = 'or';
  } else if (orCondition1 && andCondition3) {
    conjunction1 = 'or';
    conjunction2 = 'and';
  } else if (andCondition1 && andCondition2) {
    conjunction1 = 'and';
  } else if (orCondition1 && orCondition2) {
    conjunction1 = 'or';
  }

  const nounCondition1 = andCondition1 || orCondition1;
  if (nounCondition1?.noun) {
    nounCondition1.noun = nounCondition1.noun === '_AnyNoun' ? 'Any Noun' : nounCondition1.noun;
  }

  const nounCondition2 = andCondition2 || orCondition2;
  if (nounCondition2?.noun) {
    nounCondition2.noun = nounCondition2.noun === '_AnyNoun' ? 'Any Noun' : nounCondition2.noun;
  }

  const nounCondition3 = andCondition3 || orCondition3;
  if (nounCondition3?.noun) {
    nounCondition3.noun = nounCondition3.noun === '_AnyNoun' ? 'Any Noun' : nounCondition3.noun;
  }

  return {
    nounCondition1,
    nounCondition2,
    nounCondition3,
    conjunction1: conjunction1 || '',
    conjunction2: conjunction2 || '',
    consequence: tableRule.consequence,
    day: tableRule.day,
    time: tableRule.time,
    id: tableRule.id,
  };
}
