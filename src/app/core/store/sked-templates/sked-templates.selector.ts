import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {skedTemplatesAdapter} from './sked-templates.state';

export const selectSkedTemplatesState = (state: AppState) => state.skedTemplates;

export const selectAllSkedTemplates = createSelector(
  selectSkedTemplatesState,
  skedTemplatesAdapter.getSelectors().selectAll
);

export const selectSkedTemplatesMap = createSelector(
  selectSkedTemplatesState,
  skedTemplatesAdapter.getSelectors().selectEntities
);

export const selectSkedTemplateById = (id: string) =>
  createSelector(selectSkedTemplatesMap, skedTemplatesMap => skedTemplatesMap[id]);
