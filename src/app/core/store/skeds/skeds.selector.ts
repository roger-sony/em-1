import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {selectSearchParams} from '../router/router.selector';
import {skedsAdapter} from './skeds.state';
import {filterSkedTemplatesBySearchParams} from '../../../shared/utils/skeds/filter-sked-templates-by-search-params';

export const selectSkedsState = (state: AppState) => state.skeds;

export const selectAllSkedTemplates = createSelector(selectSkedsState, skedsAdapter.getSelectors().selectAll);

export const selectSkedTemplatesMap = createSelector(selectSkedsState, skedsAdapter.getSelectors().selectEntities);

export const selectAllFilteredSkedTemplates = createSelector(
  selectAllSkedTemplates,
  selectSearchParams,
  (skedTemplates, searchParams) => filterSkedTemplatesBySearchParams(skedTemplates, searchParams)
);

export const selectFlexSkedTemplateById = (id: string) =>
  createSelector(selectSkedTemplatesMap, skedTemplatesMap => skedTemplatesMap[id]);
