import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {UserDto} from '../../api/dto/user.dto';
import {UserApiService} from '../../api/user-api.service';
import {convertUserDtoToModel} from '../../api/utils/convert-user-dto-to-model';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {GetAllUsersAction, GetAllUsersSuccessAction, UsersActionType} from './users.action';

@Injectable()
export class UsersEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllUsersAction>(UsersActionType.GET_ALL),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.userApiService.getAll().pipe(
        map((dtos: UserDto[]) => dtos.map(dto => convertUserDtoToModel(dto))),
        mergeMap(users => [new GetAllUsersSuccessAction({users}), ...createCallbackActions(onSuccess, users)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private userApiService: UserApiService) {}
}
