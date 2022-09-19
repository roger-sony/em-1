import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {RoleDto} from '../../api/dto/role.dto';
import {RoleApiService} from '../../api/role-api.service';
import {convertRoleDtoToModel} from '../../api/utils/convert-role-dto-to-model';
import {convertRoleModelToDto} from '../../api/utils/convert-role-model-to-dto';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  CreateNewRoleAction,
  CreateNewRoleSuccessAction,
  DeleteRoleAction,
  FetchActiveUserRoles,
  GetAllRolesAction,
  GetAllRolesSuccessAction,
  RolesActionType,
  UpdateRoleAction,
  UpdateRoleSuccessAction,
} from './roles.action';
import {selectActiveUser} from '../active-user/active-user.selector';

@Injectable()
export class RolesEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllRolesAction>(RolesActionType.GET_ALL),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.roleApiService.getAll().pipe(
        map((dtos: RoleDto[]) => dtos.map(dto => convertRoleDtoToModel(dto))),
        mergeMap(roles => [new GetAllRolesSuccessAction({roles}), ...createCallbackActions(onSuccess, roles)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateNewRoleAction>(RolesActionType.CREATE),
    mergeMap(action => {
      const {role, onSuccess, onFailure} = action.payload;
      const roleDto = convertRoleModelToDto(role);

      return this.roleApiService.create(roleDto).pipe(
        map((dto: RoleDto) => convertRoleDtoToModel(dto)),
        mergeMap(newRole => [
          new CreateNewRoleSuccessAction({role: newRole}),
          ...createCallbackActions(onSuccess, newRole),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateRoleAction>(RolesActionType.UPDATE),
    mergeMap(action => {
      const {role, onSuccess, onFailure} = action.payload;
      const roleDto = convertRoleModelToDto(role);

      return this.roleApiService.update(role.id, roleDto).pipe(
        map((dto: RoleDto) => convertRoleDtoToModel(dto)),
        mergeMap(newRole => [
          new UpdateRoleSuccessAction({role: newRole}),
          ...createCallbackActions(onSuccess, newRole),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteRoleAction>(RolesActionType.DELETE),
    mergeMap(action => {
      const {roleId, onSuccess, onFailure} = action.payload;

      return this.roleApiService.delete(roleId).pipe(
        mergeMap(() => [...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public fetchForCurrentUser$: Observable<Action> = this.actions$.pipe(
    ofType<FetchActiveUserRoles>(RolesActionType.FETCH_FOR_CURRENT_USER),
    withLatestFrom(this.store$.pipe(select(selectActiveUser))),
    mergeMap(([action, user]) => {
      const {onSuccess, onFailure} = action.payload;

      return this.roleApiService.getById(user.roles).pipe(
        mergeMap(roles => [...createCallbackActions(onSuccess, roles)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private roleApiService: RoleApiService, private store$: Store) {}
}
