import {PlanNounCondition} from './plan-noun-condition';

export interface ConditionForm {
  nounCondition1: PlanNounCondition;
  nounCondition2: PlanNounCondition;
  nounCondition3: PlanNounCondition;
  consequence: string;
  day: string;
  time: string;
  conjunction1: string;
  conjunction2: string;
  id?: number;
}
