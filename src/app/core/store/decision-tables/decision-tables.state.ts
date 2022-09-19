import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {DecisionTable} from '../../model/decision-table';
import {DecisionTablePreview} from '../../model/decision-table-preview';

export interface DecisionTablesState extends EntityState<DecisionTable> {
  loaded: boolean;
  previews: Record<string, DecisionTablePreview>;
}

export const decisionTablesAdapter = createEntityAdapter<DecisionTable>();

export const initialDecisionTablesState: DecisionTablesState = decisionTablesAdapter.getInitialState({
  loaded: false,
  previews: {},
});
