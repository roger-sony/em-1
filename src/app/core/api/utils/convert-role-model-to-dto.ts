import {Role} from '../../model/role';
import {RoleDto} from '../dto/role.dto';

export function convertRoleModelToDto(role: Role): RoleDto {
  return {
    _id: role.id,
    displayName: role.displayName,
    privileges: role.privileges,
  };
}
