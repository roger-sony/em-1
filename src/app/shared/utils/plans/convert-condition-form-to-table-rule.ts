import {ConditionForm} from '../../../core/model/condition-form';
import {PlanCondition} from '../../../core/model/plan-condition';

export function convertConditionFormToTableRule(conditionForm: ConditionForm): PlanCondition {
  conditionForm.nounCondition1.order = 1;
  conditionForm.nounCondition1.noun =
    conditionForm.nounCondition1.noun === 'Any Noun' ? '_AnyNoun' : conditionForm.nounCondition1.noun;

  if (conditionForm.nounCondition2.noun) {
    conditionForm.nounCondition2.order = 2;
    conditionForm.nounCondition2.noun =
      conditionForm.nounCondition2.noun === 'Any Noun' ? '_AnyNoun' : conditionForm.nounCondition2.noun;
  }

  if (conditionForm.nounCondition3.noun) {
    conditionForm.nounCondition3.order = 3;
    conditionForm.nounCondition3.noun =
      conditionForm.nounCondition3.noun === 'Any Noun' ? '_AnyNoun' : conditionForm.nounCondition3.noun;
  }

  const andArray = [];
  const orArray = [];
  if (!conditionForm.conjunction1) {
    andArray.push(conditionForm.nounCondition1);
  } else if (conditionForm.conjunction1 && !conditionForm.conjunction2) {
    if (conditionForm.conjunction1 === 'and') {
      andArray.push(conditionForm.nounCondition1);
      andArray.push(conditionForm.nounCondition2);
    } else {
      orArray.push(conditionForm.nounCondition1);
      orArray.push(conditionForm.nounCondition2);
    }
  } else if (conditionForm.conjunction1 === conditionForm.conjunction2) {
    if (conditionForm.conjunction1 === 'and') {
      andArray.push(conditionForm.nounCondition1);
      andArray.push(conditionForm.nounCondition2);
      andArray.push(conditionForm.nounCondition3);
    } else {
      orArray.push(conditionForm.nounCondition1);
      orArray.push(conditionForm.nounCondition2);
      orArray.push(conditionForm.nounCondition3);
    }
  } else {
    if (conditionForm.conjunction1 === 'and') {
      andArray.push(conditionForm.nounCondition1);
      andArray.push(conditionForm.nounCondition2);
      orArray.push(conditionForm.nounCondition3);
    } else {
      orArray.push(conditionForm.nounCondition1);
      orArray.push(conditionForm.nounCondition2);
      andArray.push(conditionForm.nounCondition3);
    }
  }

  return {
    and: andArray,
    or: orArray,
    consequence: conditionForm.consequence,
    day: conditionForm.day,
    time: conditionForm.time,
    id: conditionForm.id || Date.now(),
  };
}
