import {Privilege} from 'src/app/app.constants';

export interface RoleDto {
  _id: string;
  displayName: string;
  privileges: Privilege[];
  __v?: number;
}
