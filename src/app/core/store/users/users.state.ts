import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {User} from '../../model/user';

export interface UsersState extends EntityState<User> {}

export const usersAdapter = createEntityAdapter<User>();

export const initialUsersState: UsersState = usersAdapter.getInitialState();
