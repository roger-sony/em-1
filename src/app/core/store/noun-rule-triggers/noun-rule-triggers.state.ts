import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {NounRuleTrigger} from '../../model/noun-rule-trigger';

export interface NounRuleTriggersState extends EntityState<NounRuleTrigger> {
  loaded: boolean;
}

export const nounRuleTriggersAdapter = createEntityAdapter<NounRuleTrigger>();

export const initialNounRuleTriggersState: NounRuleTriggersState = nounRuleTriggersAdapter.getInitialState({
  loaded: false,
});
