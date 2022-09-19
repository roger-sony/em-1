import {Adjective} from '../../model/adjective';
import {AdjectiveDto} from '../../api/dto/adjective.dto';
import {AdjectivesApiService} from '../../api/adjectives-api.service';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {
  AdjectivesActionType,
  CreateNewAdjectiveAction,
  GetAllAdjectivesAction,
  GetAllAdjectivesSuccessAction,
  CreateNewAdjectiveSuccessAction,
  DeleteAdjectiveAction,
  DeleteAdjectiveSuccessAction,
  UpdateAdjectiveAction,
  UpdateAdjectiveSuccessAction,
} from './adjectives.action';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {convertAdjectiveDtoToModel} from '../../api/utils/convert-adjective-dto-to-model';
import {convertAdjectiveModelToDto} from '../../api/utils/convert-adjective-model-to-dto';

@Injectable()
export class AdjectivesEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllAdjectivesAction>(AdjectivesActionType.GET_ALL),
    mergeMap(action => {
      const {hideDisabled, name, onSuccess, onFailure, sortBy} = action.payload;
      const params: {[key: string]: string | string[]} = {};

      if (hideDisabled) {
        params.active = 'true';
      }
      if (name) {
        params.name = name;
      }
      if (sortBy) {
        params.sortBy = sortBy;
      }

      return this.adjectivesApiService.getAdjectives(params).pipe(
        map((dtos: AdjectiveDto[]) => dtos.map(dto => convertAdjectiveDtoToModel(dto))),
        mergeMap(adjectives => [
          new GetAllAdjectivesSuccessAction({adjectives}),
          ...createCallbackActions(onSuccess, adjectives),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateNewAdjectiveAction>(AdjectivesActionType.CREATE),
    mergeMap(action => {
      const {adjective, onSuccess, onFailure} = action.payload;
      const adjectiveDto = convertAdjectiveModelToDto(adjective);

      return this.adjectivesApiService.create(adjectiveDto).pipe(
        map((dto: AdjectiveDto) => convertAdjectiveDtoToModel(dto)),
        mergeMap(createdAdjective => [
          new CreateNewAdjectiveSuccessAction({adjective: createdAdjective}),
          new GetAllAdjectivesAction({}),
          ...createCallbackActions(onSuccess, createdAdjective),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateAdjectiveAction>(AdjectivesActionType.UPDATE),
    mergeMap(action => {
      const {adjectiveId, adjective, onSuccess, onFailure} = action.payload;
      const adjectiveDto = convertAdjectiveModelToDto(adjective as Adjective);

      return this.adjectivesApiService.update(adjectiveId, adjectiveDto).pipe(
        map(dto => convertAdjectiveDtoToModel(dto)),
        mergeMap(newAdjective => [
          new UpdateAdjectiveSuccessAction({newAdjective}),
          new GetAllAdjectivesAction({}),
          ...createCallbackActions(onSuccess, newAdjective),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteAdjectiveAction>(AdjectivesActionType.DELETE),
    mergeMap(action => {
      const {id, onSuccess, onFailure} = action.payload;

      return this.adjectivesApiService.delete(id).pipe(
        mergeMap(() => [
          new DeleteAdjectiveSuccessAction({id}),
          new GetAllAdjectivesAction({}),
          ...createCallbackActions(onSuccess, id),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private adjectivesApiService: AdjectivesApiService) {}
}
