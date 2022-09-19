import {Adjective} from './../../model/adjective';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export interface AdjectivesState extends EntityState<Adjective> {
  loaded: boolean;
  adjectives: Adjective[];
  adjectivesMap: Record<string, Adjective>;
}

export const adjectivesAdapter = createEntityAdapter<Adjective>();

export const initialAdjectivesState: AdjectivesState = adjectivesAdapter.getInitialState({
  loaded: false,
  adjectives: [],
  adjectivesMap: {},
});
