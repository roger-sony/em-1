import {SentencesAction, SentencesActionType} from './sentences.action';
import {SentencesState, initialSentencesState, sentencesAdapter} from './sentences.state';

export function sentencesReducer(
  state: SentencesState = initialSentencesState,
  action: SentencesAction
): SentencesState {
  switch (action.type) {
    case SentencesActionType.GET_SUCCESS:
      return sentencesAdapter.setAll(action.payload.sentences, state);
    case SentencesActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case SentencesActionType.CLEAR:
      return initialSentencesState;
    default:
      return state;
  }
}
