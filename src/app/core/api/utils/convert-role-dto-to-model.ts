import {Role} from '../../model/role';
import {RoleDto} from '../dto/role.dto';

export function convertRoleDtoToModel(dto: RoleDto): Role {
  return {
    id: dto._id,
    displayName: dto.displayName,
    privileges: dto.privileges,
  };
}
