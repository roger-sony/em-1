import {Privilege} from '../../../app.constants';

export interface PrivilegesState {
  privileges: Privilege[];
}

export const initialPrivilegesState: PrivilegesState = {
  privileges: null,
};
