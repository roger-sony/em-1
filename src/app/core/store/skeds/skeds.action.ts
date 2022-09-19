import {Action} from '@ngrx/store';
import {FlexSkedTemplate} from '../../model/flex-sked-template';

export enum SkedsActionType {
  GET_ALL_TEMPLATES = '[Skeds] Get All Templates',
  GET_ALL_TEMPLATES_SUCCESS = '[Skeds] Get All Templates :: Success',

  GET_SINGLE_TEMPLATE = '[Skeds] Get Single Template',
  GET_SINGLE_TEMPLATE_SUCCESS = '[Skeds] Get Single Template :: Success',

  CREATE_TEMPLATE = '[Skeds] Create Template',
  CREATE_TEMPLATE_SUCCESS = '[Skeds] Create Template :: Success',

  UPDATE_TEMPLATE = '[Skeds] Update Template',
  UPDATE_TEMPLATE_SUCCESS = '[Skeds] Update Template :: Success',

  DELETE_TEMPLATE = '[Skeds] Delete Template',
  DELETE_TEMPLATE_SUCCESS = '[Skeds] Delete Template :: Success',

  REINSTANTIATE_WEEK = '[Skeds] Reinstantiate Week',
  REINSTANTIATE_WEEK_SUCCESS = '[Skeds] Reinstantiate Week :: Success',

  CLEAR = '[Skeds] Clear',
}

export class GetAllSkedTemplatesAction implements Action {
  public readonly type = SkedsActionType.GET_ALL_TEMPLATES;

  public constructor(
    public payload: {
      empty?: boolean;
      onSuccess?: (skedTemplates: FlexSkedTemplate[]) => void;
      onFailure?: (error: Error) => void;
      sort?: string;
      sortDir?: string;
    }
  ) {}
}

export class GetAllSkedTemplatesSuccessAction implements Action {
  public readonly type = SkedsActionType.GET_ALL_TEMPLATES_SUCCESS;

  public constructor(public payload: {skedTemplates: FlexSkedTemplate[]}) {}
}

export class GetSingleSkedTemplateAction implements Action {
  public readonly type = SkedsActionType.GET_SINGLE_TEMPLATE;

  public constructor(
    public payload: {
      templateId: string;
      onSuccess?: (skedTemplate: FlexSkedTemplate) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetSingleSkedTemplateSuccessAction implements Action {
  public readonly type = SkedsActionType.GET_SINGLE_TEMPLATE_SUCCESS;

  public constructor(public payload: {skedTemplate: FlexSkedTemplate}) {}
}

export class CreateSkedTemplateAction implements Action {
  public readonly type = SkedsActionType.CREATE_TEMPLATE;

  public constructor(
    public payload: {
      skedTemplate: FlexSkedTemplate;
      onSuccess?: (skedTemplate: FlexSkedTemplate) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateSkedTemplateSuccessAction implements Action {
  public readonly type = SkedsActionType.CREATE_TEMPLATE_SUCCESS;

  public constructor(public payload: {skedTemplate: FlexSkedTemplate}) {}
}

export class UpdateSkedTemplateAction implements Action {
  public readonly type = SkedsActionType.UPDATE_TEMPLATE;

  public constructor(
    public payload: {
      skedId: string;
      skedTemplate: Partial<FlexSkedTemplate>;
      onSuccess?: (skedTemplate: FlexSkedTemplate) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class UpdateSkedTemplateSuccessAction implements Action {
  public readonly type = SkedsActionType.UPDATE_TEMPLATE_SUCCESS;

  public constructor(public payload: {skedTemplate: FlexSkedTemplate}) {}
}

export class DeleteSkedTemplateAction implements Action {
  public readonly type = SkedsActionType.DELETE_TEMPLATE;

  public constructor(
    public payload: {
      skedTemplateId: string;
      onSuccess?: (skedTemplateId: string) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteSkedTemplateSuccessAction implements Action {
  public readonly type = SkedsActionType.DELETE_TEMPLATE_SUCCESS;

  public constructor(public payload: {skedTemplateId: string}) {}
}

export class ReinstantiateWeekAction implements Action {
  public readonly type = SkedsActionType.REINSTANTIATE_WEEK;

  public constructor(
    public payload: {
      onSuccess?: () => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class ReinstantiateWeekSuccessAction implements Action {
  public readonly type = SkedsActionType.REINSTANTIATE_WEEK_SUCCESS;

  public constructor(public payload: {}) {}
}

export type SkedsAction =
  | GetAllSkedTemplatesAction
  | GetAllSkedTemplatesSuccessAction
  | GetSingleSkedTemplateAction
  | GetSingleSkedTemplateSuccessAction
  | CreateSkedTemplateAction
  | CreateSkedTemplateSuccessAction
  | UpdateSkedTemplateAction
  | UpdateSkedTemplateSuccessAction
  | DeleteSkedTemplateAction
  | DeleteSkedTemplateSuccessAction
  | ReinstantiateWeekAction
  | ReinstantiateWeekSuccessAction;
