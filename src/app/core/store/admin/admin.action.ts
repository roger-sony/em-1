import {Action} from '@ngrx/store';
import {TenantForm} from '../../model/tenant-form';

export enum AdminActionType {
  CREATE_TENANT = '[Admin] Create Tenant',
  CREATE_TENANT_SUCCESS = '[Admin] Create Tenant :: Success',
}

export class CreateTenantAction implements Action {
  public readonly type = AdminActionType.CREATE_TENANT;

  public constructor(
    public payload: {
      data: TenantForm;
      onSuccess?: () => void;
      // tslint:disable-next-line:no-any
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateTenantSuccessAction implements Action {
  public readonly type = AdminActionType.CREATE_TENANT_SUCCESS;

  public constructor(public payload: {data: TenantForm}) {}
}

export type AdminAction = CreateTenantAction | CreateTenantSuccessAction;
