import {Privilege} from 'src/app/app.constants';

export interface Role {
  id: string;
  displayName: string;
  privileges: Privilege[];
}

export interface RoleForm {
  privileges: Privilege[];
  displayName: string;
}
