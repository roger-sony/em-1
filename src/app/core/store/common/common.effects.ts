import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CommonActionType, ExecuteCallbackAction, HandleErrorAction} from './common.action';

@Injectable()
export class CommonEffects {
  @Effect({dispatch: false})
  public executeCallback$: Observable<Action> = this.actions$.pipe(
    ofType<ExecuteCallbackAction>(CommonActionType.EXECUTE_CALLBACK),
    tap((action: ExecuteCallbackAction) => action.payload.callback())
  );

  @Effect({dispatch: false})
  public handleError$: Observable<Action> = this.actions$.pipe(
    ofType<HandleErrorAction>(CommonActionType.HANDLE_ERROR),
    tap((action: HandleErrorAction) => console.error(action.payload.error)) // TODO maybe send to Sentry as well
  );

  constructor(private actions$: Actions) {}
}
