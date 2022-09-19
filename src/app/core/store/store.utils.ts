import {Action} from '@ngrx/store';
import {from, Observable} from 'rxjs';
import {ExecuteCallbackAction, HandleErrorAction} from './common/common.action';

export function createCallbackActions<T>(callback: (result: T) => void, result?: T): Action[] {
  return callback ? [new ExecuteCallbackAction({callback: () => callback(result)})] : [];
}

export function emitErrorActions(
  error: Error,
  onFailure?: (error: Error) => void,
  ignore?: boolean
): Observable<Action> {
  const actions: Action[] = ignore ? [] : [new HandleErrorAction({error})];
  if (onFailure) {
    actions.push(new ExecuteCallbackAction({callback: () => onFailure(error)}));
  }
  return from(actions);
}
