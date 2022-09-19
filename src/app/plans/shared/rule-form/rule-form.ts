import {FactFilter} from '../../../core/model/fact-filter';

export interface RuleForm {
  facts: FactFilter[];
  consequence?: string;
  sked?: string;
}
