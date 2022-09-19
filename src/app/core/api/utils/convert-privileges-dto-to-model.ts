import {Privilege, PrivilegeDto} from '../../../app.constants';

export function ConvertPrivilegesDtoToModel(privileges: PrivilegeDto[]): Privilege[] {
  return privileges.map(p => ({
    id: p._id,
    name: p.name,
    v: p.__v,
  }));
}
