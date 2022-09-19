import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Verb} from './../../model/verb';

export interface VerbsState extends EntityState<Verb> {
  verbs: Verb[];
  loaded: boolean;
}

export const verbsAdapter = createEntityAdapter<Verb>();

export const initialVerbsState: VerbsState = verbsAdapter.getInitialState({
  verbs: null,
  loaded: false,
});
