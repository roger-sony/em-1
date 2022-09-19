import {SkedTemplatesAction, SkedTemplatesActionType} from './sked-templates.action';
import {initialSkedTemplatesState, skedTemplatesAdapter, SkedTemplatesState} from './sked-templates.state';

export function skedTemplatesReducer(
  state: SkedTemplatesState = initialSkedTemplatesState,
  action: SkedTemplatesAction
): SkedTemplatesState {
  switch (action.type) {
    case SkedTemplatesActionType.GET_ALL_SUCCESS:
      return skedTemplatesAdapter.setAll(action.payload.skedTemplates, state);
    case SkedTemplatesActionType.CLEAR:
      return initialSkedTemplatesState;
    default:
      return state;
  }
}
