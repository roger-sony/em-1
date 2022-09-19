import {ParagraphsAction, ParagraphsActionType} from './paragraphs.action';
import {initialParagraphsState, paragraphsAdapter, ParagraphsState} from './paragraphs.state';

export function paragraphsReducer(
  state: ParagraphsState = initialParagraphsState,
  action: ParagraphsAction
): ParagraphsState {
  switch (action.type) {
    case ParagraphsActionType.GET_SUCCESS:
      return paragraphsAdapter.setAll(action.payload.paragraphs, state);
    case ParagraphsActionType.SET_COUNT:
      return {...state, paragraphsCount: action.payload.paragraphsCount};
    case ParagraphsActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case ParagraphsActionType.UPDATE_SENTENCES:
      return {...state, sentences: action.payload.sentences};
    case ParagraphsActionType.CLEAR_SENTENCES:
      return {...state, sentences: null};
    case ParagraphsActionType.CLEAR:
      return initialParagraphsState;
    default:
      return state;
  }
}
