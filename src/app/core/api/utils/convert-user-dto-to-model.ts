import {User} from '../../model/user';
import {UserDto} from '../dto/user.dto';

export function convertUserDtoToModel(dto: UserDto): User {
  return {
    id: dto._id,
    userName: dto.username,
    roles: dto.roles,
  };
}
