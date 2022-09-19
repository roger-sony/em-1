import {Sentence} from './../../model/sentence';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Paragraph} from './../../model/paragraph';

export interface ParagraphsState extends EntityState<Paragraph> {
  paragraphs: Paragraph[];
  paragraphsCount: number;
  loaded: boolean;
  sentences: Sentence[];
}

export const paragraphsAdapter = createEntityAdapter<Paragraph>();

export const initialParagraphsState: ParagraphsState = paragraphsAdapter.getInitialState({
  paragraphs: null,
  paragraphsCount: 0,
  loaded: false,
  sentences: null,
});
