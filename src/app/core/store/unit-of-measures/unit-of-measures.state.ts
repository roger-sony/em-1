import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {UnitOfMeasure} from '../../model/unit-of-measure';

export interface UnitOfMeasuresState extends EntityState<UnitOfMeasure> {
  loaded: boolean;
}

export const unitOfMeasuresAdapter = createEntityAdapter<UnitOfMeasure>();

export const initialUnitOfMeasuresState: UnitOfMeasuresState = unitOfMeasuresAdapter.getInitialState({
  loaded: false,
});
