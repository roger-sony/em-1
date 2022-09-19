import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Role} from '../../model/role';

export interface RolesState extends EntityState<Role> {}

export const rolesAdapter = createEntityAdapter<Role>();

export const initialRolesState: RolesState = rolesAdapter.getInitialState();
