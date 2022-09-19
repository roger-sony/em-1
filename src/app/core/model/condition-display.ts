import {FactFilterDisplay} from './fact-filter-display';

export interface ConditionDisplay {
  name: string;
  factFiltersDisplay: FactFilterDisplay[];
  id?: string;
  index: number;
}
