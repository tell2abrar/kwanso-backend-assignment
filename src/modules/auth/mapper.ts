import { User } from '../../db/entities';
import { UserDto } from '../user/dto';
import { SessionPayloadDto } from './dto';
import { IAuthMapper } from './interface';

class AuthMapper implements IAuthMapper {
  entityToDto(user: User): UserDto {
    const userObj: UserDto = {
      id: user.id,
      email: user.email,
    };
    return userObj;
  }

  createSessionDto(user: User): SessionPayloadDto {
    const sessionPayload: SessionPayloadDto = {
      id: user.id,
      email: user.email,
    };
    return sessionPayload;
  }
}

export default <IAuthMapper>new AuthMapper();
