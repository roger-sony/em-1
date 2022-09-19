import {Action} from '@ngrx/store';
import {SkedTemplate} from '../../model/sked-template';

export enum SkedTemplatesActionType {
  GET_ALL = '[Sked Templates] Get All',
  GET_ALL_SUCCESS = '[Sked Templates] Get All :: Success',

  CLEAR = '[Sked Templates] Clear',
}

export class GetAllSkedTemplatesAction implements Action {
  public readonly type = SkedTemplatesActionType.GET_ALL;

  public constructor(
    public payload: {
      onSuccess?: (skedTemplates: SkedTemplate[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllSkedTemplatesSuccessAction implements Action {
  public readonly type = SkedTemplatesActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {skedTemplates: SkedTemplate[]}) {}
}

export class ClearSkedTemplatesAction implements Action {
  public readonly type = SkedTemplatesActionType.CLEAR;
}

export type SkedTemplatesAction =
  | GetAllSkedTemplatesAction
  | GetAllSkedTemplatesSuccessAction
  | ClearSkedTemplatesAction;
