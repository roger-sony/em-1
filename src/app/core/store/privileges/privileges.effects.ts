import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  CreatePrivilegeAction,
  DeletePrivilegeAction,
  FetchAllowedPrivilegesAction,
  FetchAllowedPrivilegesActionSuccess,
  PrivilegesActionType,
  SetPrivilegesLoadedAction,
  UpdatePrivilegeAction,
} from './privileges.action';
import {catchError, mergeMap} from 'rxjs/operators';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {PrivilegesApiService} from '../../api/privileges-api.service';
import {ConvertPrivilegesDtoToModel} from '../../api/utils/convert-privileges-dto-to-model';
import {ConvertPrivilegeModelToDto} from '../../api/utils/convert-privileges-model-to-dto';

@Injectable()
export class PrivilegesEffects {
  @Effect()
  public fetch$: Observable<Action> = this.actions$.pipe(
    ofType<FetchAllowedPrivilegesAction>(PrivilegesActionType.FETCH_ALLOWED_PRIVILEGES),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.privilegesService.fetch().pipe(
        mergeMap(privilegesDto => {
          const privileges = ConvertPrivilegesDtoToModel(privilegesDto);
          return [
            new FetchAllowedPrivilegesActionSuccess(privileges),
            new SetPrivilegesLoadedAction({loaded: true}),
            ...createCallbackActions(onSuccess, privileges),
          ];
        }),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public deletePrivilege$: Observable<Action> = this.actions$.pipe(
    ofType<DeletePrivilegeAction>(PrivilegesActionType.DELETE_PRIVILEGE),
    mergeMap(action => {
      const {privilegeId, onSuccess, onFailure} = action.payload;

      return this.privilegesService.delete(privilegeId).pipe(
        mergeMap(() => {
          return [...createCallbackActions(onSuccess)];
        }),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public updatePrivilege$: Observable<Action> = this.actions$.pipe(
    ofType<UpdatePrivilegeAction>(PrivilegesActionType.UPDATE_PRIVILEGE),
    mergeMap(action => {
      const {privilege, onSuccess, onFailure} = action.payload;
      const privilegeDto = ConvertPrivilegeModelToDto(privilege);

      return this.privilegesService.update(privilegeDto).pipe(
        mergeMap(() => {
          return [...createCallbackActions(onSuccess)];
        }),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public createPrivilege$: Observable<Action> = this.actions$.pipe(
    ofType<CreatePrivilegeAction>(PrivilegesActionType.CREATE_PRIVILEGE),
    mergeMap(action => {
      const {name, onSuccess, onFailure} = action.payload;

      return this.privilegesService.create(name).pipe(
        mergeMap(() => {
          return [...createCallbackActions(onSuccess)];
        }),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private privilegesService: PrivilegesApiService) {}
}
