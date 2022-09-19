import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {RuleSchedule} from '../../model/rule-schedule';

export interface RuleSchedulesState extends EntityState<RuleSchedule> {
  loaded: boolean;
}

export const ruleSchedulesAdapter = createEntityAdapter<RuleSchedule>({
  sortComparer: (a, b) => (a.displayName || '').localeCompare(b.displayName || ''),
});

export const initialRuleSchedulesState: RuleSchedulesState = ruleSchedulesAdapter.getInitialState({
  loaded: false,
});
