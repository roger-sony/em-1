import {User} from '../../model/user';

export interface ActiveUserState {
  user: User;
  privileges: string[];
}

export const initialActiveUserState: ActiveUserState = {
  user: null,
  privileges: null,
};
