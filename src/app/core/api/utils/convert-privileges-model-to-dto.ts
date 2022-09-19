import {Privilege, PrivilegeDto} from '../../../app.constants';

export function ConvertPrivilegesModelToDto(privileges: Privilege[]): PrivilegeDto[] {
  return privileges.map(p => ({
    __v: p.v,
    _id: p.id,
    name: p.name,
  }));
}
export function ConvertPrivilegeModelToDto(privilege: Privilege): PrivilegeDto {
  return {
    __v: privilege.v,
    _id: privilege.id,
    name: privilege.name,
  };
}
