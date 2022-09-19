import {PlanNounCondition} from './plan-noun-condition';

export interface PlanCondition {
  and: PlanNounCondition[];
  or: PlanNounCondition[];
  consequence: string;
  day: string;
  time: string;
  id?: number;
}
