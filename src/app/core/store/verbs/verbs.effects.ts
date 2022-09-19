import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {convertVerbDtoToModel} from '../../api/utils/convert-verb-dto-to-model';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {VerbDto} from './../../api/dto/verb.dto';
import {VerbsApiService} from './../../api/verbs-api.service';
import {
  CreateVerbAction,
  CreateVerbSuccessAction,
  GetVerbsAction,
  GetVerbsSuccessAction,
  SetVerbsLoadedAction,
  VerbsActionType,
  DeleteVerbAction,
  DeleteVerbSuccessAction,
} from './verbs.action';

@Injectable()
export class VerbsEffects {
  @Effect()
  public get$: Observable<Action> = this.actions$.pipe(
    ofType<GetVerbsAction>(VerbsActionType.GET),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.verbsApiService.getAll().pipe(
        map((dtos: VerbDto[]) => dtos.map(dto => convertVerbDtoToModel(dto))),
        mergeMap(verbs => [
          new GetVerbsSuccessAction({verbs}),
          new SetVerbsLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, verbs),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateVerbAction>(VerbsActionType.CREATE),
    mergeMap(action => {
      const {verb, onSuccess, onFailure} = action.payload;

      return this.verbsApiService.create(verb).pipe(
        mergeMap(createdVerb => [
          new CreateVerbSuccessAction({verb: createdVerb}),
          new GetVerbsAction({}),
          ...createCallbackActions(onSuccess, createdVerb),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteVerbAction>(VerbsActionType.DELETE),
    mergeMap(action => {
      const {verbId, onSuccess, onFailure} = action.payload;

      return this.verbsApiService.delete(verbId).pipe(
        mergeMap(() => [
          new DeleteVerbSuccessAction({verbId}),
          new GetVerbsAction({}),
          ...createCallbackActions(onSuccess),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private verbsApiService: VerbsApiService) {}
}
