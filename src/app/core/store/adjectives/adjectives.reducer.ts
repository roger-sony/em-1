import {Adjective} from './../../model/adjective';
import {AdjectivesAction, AdjectivesActionType} from './adjectives.action';
import {AdjectivesState, initialAdjectivesState} from './adjectives.state';

export function adjectivesReducer(
  state: AdjectivesState = initialAdjectivesState,
  action: AdjectivesAction
): AdjectivesState {
  switch (action.type) {
    case AdjectivesActionType.GET_ALL_SUCCESS:
      const adjectivesMap = action.payload.adjectives.reduce(
        (map: Record<string, Adjective>, obj) => ((map[obj.id] = obj), map),
        {}
      );
      return {...state, adjectives: action.payload.adjectives, loaded: true, adjectivesMap};
    default:
      return state;
  }
}
