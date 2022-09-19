import {Action} from '@ngrx/store';
import {UnitOfMeasure} from '../../model/unit-of-measure';

export enum UnitOfMeasuresActionType {
  GET = '[UnitOfMeasures] Get',
  GET_SUCCESS = '[UnitOfMeasures] Get :: Success',

  SET_LOADED = '[UnitOfMeasures] Set Loaded',

  CLEAR = '[UnitOfMeasures] Clear',
}

export class GetUnitOfMeasuresAction implements Action {
  public readonly type = UnitOfMeasuresActionType.GET;

  public constructor(
    public payload: {
      onSuccess?: (unitOfMeasures: UnitOfMeasure[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetUnitOfMeasuresSuccessAction implements Action {
  public readonly type = UnitOfMeasuresActionType.GET_SUCCESS;

  public constructor(public payload: {unitOfMeasures: UnitOfMeasure[]}) {}
}

export class SetUnitOfMeasuresLoadedAction implements Action {
  public readonly type = UnitOfMeasuresActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class ClearUnitOfMeasuresAction implements Action {
  public readonly type = UnitOfMeasuresActionType.CLEAR;
}

export type UnitOfMeasuresAction =
  | GetUnitOfMeasuresAction
  | GetUnitOfMeasuresSuccessAction
  | SetUnitOfMeasuresLoadedAction
  | ClearUnitOfMeasuresAction;
