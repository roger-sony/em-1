import {ChaptersAction, ChaptersActionType} from './chapters.action';
import {chaptersAdapter, ChaptersState, initialChaptersState} from './chapters.state';

export function chaptersReducer(state: ChaptersState = initialChaptersState, action: ChaptersAction): ChaptersState {
  switch (action.type) {
    case ChaptersActionType.GET_ALL_SUCCESS:
      return chaptersAdapter.setAll(action.payload.chapters, {...state, loaded: true});
    case ChaptersActionType.GET_SINGLE_SUCCESS:
      return chaptersAdapter.upsertOne(action.payload.chapter, state);
    case ChaptersActionType.GET_TASKS_SUCCESS: {
      const {chapterId, tasks} = action.payload;
      const tasksMap = {...state.tasksMap, [chapterId]: tasks};
      return {...state, tasksMap};
    }
    case ChaptersActionType.GET_NOUNS_SUCCESS: {
      const {chapterId, nouns} = action.payload;
      const nounsMap = {...state.nounsMap, [chapterId]: nouns};
      return {...state, nounsMap};
    }
    case ChaptersActionType.GET_PLANS_SUCCESS: {
      const {chapterId, plans} = action.payload;
      const plansMap = {...state.plansMap, [chapterId]: plans};
      return {...state, plansMap};
    }
    case ChaptersActionType.CREATE_SUCCESS:
      return chaptersAdapter.addOne(action.payload.chapter, state);
    case ChaptersActionType.UPDATE_SUCCESS:
      return chaptersAdapter.upsertOne(action.payload.chapter, state);
    case ChaptersActionType.DELETE_SUCCESS:
      return chaptersAdapter.removeOne(action.payload.chapterId, state);
    case ChaptersActionType.CLEAR:
      return initialChaptersState;
    default:
      return state;
  }
}
