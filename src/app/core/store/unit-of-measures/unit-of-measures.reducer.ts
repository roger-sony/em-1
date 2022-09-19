import {UnitOfMeasuresAction, UnitOfMeasuresActionType} from './unit-of-measures.action';
import {initialUnitOfMeasuresState, unitOfMeasuresAdapter, UnitOfMeasuresState} from './unit-of-measures.state';

export function unitOfMeasuresReducer(
  state: UnitOfMeasuresState = initialUnitOfMeasuresState,
  action: UnitOfMeasuresAction
): UnitOfMeasuresState {
  switch (action.type) {
    case UnitOfMeasuresActionType.GET_SUCCESS:
      return unitOfMeasuresAdapter.setAll(action.payload.unitOfMeasures, state);
    case UnitOfMeasuresActionType.SET_LOADED:
      return {...state, loaded: action.payload.loaded};
    case UnitOfMeasuresActionType.CLEAR:
      return initialUnitOfMeasuresState;
    default:
      return state;
  }
}
