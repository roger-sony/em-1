import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Sentence} from './../../model/sentence';

export interface SentencesState extends EntityState<Sentence> {
  sentences: Sentence[];
  loaded: boolean;
}

export const sentencesAdapter = createEntityAdapter<Sentence>();

export const initialSentencesState: SentencesState = sentencesAdapter.getInitialState({
  sentences: null,
  loaded: false,
});
