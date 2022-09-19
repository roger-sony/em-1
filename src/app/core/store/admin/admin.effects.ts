import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {CreateTenantAction, CreateTenantSuccessAction, AdminActionType} from './admin.action';
import {AdminApiService} from '../../api/admin-api.service';

@Injectable()
export class AdminEffects {
  @Effect()
  public createTenant$: Observable<Action> = this.actions$.pipe(
    ofType<CreateTenantAction>(AdminActionType.CREATE_TENANT),
    mergeMap(action => {
      const {data, onSuccess, onFailure} = action.payload;
      return this.adminApiService.createTenant(data).pipe(
        mergeMap(response => [
          new CreateTenantSuccessAction({data: response}),
          ...createCallbackActions(onSuccess, response),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private adminApiService: AdminApiService) {}
}
