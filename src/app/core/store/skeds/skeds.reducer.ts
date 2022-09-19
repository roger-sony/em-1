import {SkedsAction, SkedsActionType} from './skeds.action';
import {SkedsState, initialSkedsState, skedsAdapter} from './skeds.state';

export function skedsReducer(state: SkedsState = initialSkedsState, action: SkedsAction): SkedsState {
  switch (action.type) {
    case SkedsActionType.GET_ALL_TEMPLATES_SUCCESS:
      return skedsAdapter.setAll(action.payload.skedTemplates, {...state, loaded: true});

    case SkedsActionType.GET_SINGLE_TEMPLATE_SUCCESS:
      return skedsAdapter.upsertOne(action.payload.skedTemplate, state);

    case SkedsActionType.CREATE_TEMPLATE_SUCCESS:
      return skedsAdapter.addOne(action.payload.skedTemplate, state);

    case SkedsActionType.UPDATE_TEMPLATE_SUCCESS:
      return skedsAdapter.upsertOne(action.payload.skedTemplate, state);

    case SkedsActionType.DELETE_TEMPLATE_SUCCESS:
      return skedsAdapter.removeOne(action.payload.skedTemplateId, state);

    default:
      return state;
  }
}
