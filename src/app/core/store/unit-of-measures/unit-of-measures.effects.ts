import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {UnitOfMeasureDto} from '../../api/dto/unit-of-measure.dto';
import {UnitOfMeasureApiService} from '../../api/unit-of-measure-api.service';
import {convertUnitOfMeasureDtoToModel} from '../../api/utils/convert-unit-of-measure-dto-to-model';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  GetUnitOfMeasuresAction,
  GetUnitOfMeasuresSuccessAction,
  SetUnitOfMeasuresLoadedAction,
  UnitOfMeasuresActionType,
} from './unit-of-measures.action';

@Injectable()
export class UnitOfMeasuresEffects {
  @Effect()
  public get$: Observable<Action> = this.actions$.pipe(
    ofType<GetUnitOfMeasuresAction>(UnitOfMeasuresActionType.GET),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.unitOfMeasureApiService.getAll().pipe(
        map((dtos: UnitOfMeasureDto[]) => dtos.map(dto => convertUnitOfMeasureDtoToModel(dto))),
        mergeMap(unitOfMeasures => [
          new GetUnitOfMeasuresSuccessAction({unitOfMeasures}),
          new SetUnitOfMeasuresLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, unitOfMeasures),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private unitOfMeasureApiService: UnitOfMeasureApiService) {}
}
