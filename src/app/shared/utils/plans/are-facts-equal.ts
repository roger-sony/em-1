import {FactFilter} from '../../../core/model/fact-filter';

export function areFactsEqual(fact1: FactFilter, fact2: FactFilter): boolean {
  return fact1?.name === fact2?.name && fact1?.operation === fact2?.operation && fact1?.value === fact2?.value;
}
