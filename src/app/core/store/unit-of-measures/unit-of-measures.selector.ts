import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';
import {unitOfMeasuresAdapter} from './unit-of-measures.state';
import {UnitOfMeasure} from '../../model/unit-of-measure';

export const selectUnitOfMeasuresState = (state: AppState) => state.unitOfMeasures;

export const selectAllUnitOfMeasures = createSelector(
  selectUnitOfMeasuresState,
  unitOfMeasuresAdapter.getSelectors().selectAll
);

export const selectUnitOfMeasuresMap = createSelector(
  selectUnitOfMeasuresState,
  unitOfMeasuresAdapter.getSelectors().selectEntities
);

export const selectUnitOfMeasuresNounSubcategoryMap = createSelector(selectAllUnitOfMeasures, unitOfMeasures =>
  unitOfMeasures.reduce((nounMap: Record<string, UnitOfMeasure>, unitOfMeasure) => {
    nounMap[unitOfMeasure.nounSubcategory] = unitOfMeasure;
    return nounMap;
  }, {})
);

export const selectUnitOfMeasureById = (id: string) =>
  createSelector(selectUnitOfMeasuresMap, unitOfMeasuresMap => unitOfMeasuresMap[id]);

export const selectUnitOfMeasureByNounSubcategory = (name: string) =>
  createSelector(selectAllUnitOfMeasures, units => units.find(unit => unit.nounSubcategory === name));

export const selectUnitOfMeasuresLoaded = createSelector(selectUnitOfMeasuresState, state => state.loaded);

export const selectUnitOfMeasuresLoading = createSelector(selectUnitOfMeasuresLoaded, loaded => !loaded);
