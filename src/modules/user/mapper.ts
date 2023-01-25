import { User } from '../../db/entities';
import { IUserMapper } from './interface';
import { CreateUserDto, UserDto } from './dto';

class UserMapper implements IUserMapper {
  dtoToEntity(req: CreateUserDto): Partial<User> {
    const user: Partial<User> = {
      email: req.email,
      password: req.password,
    };
    return user;
  }

  entityToDto(req: User): UserDto {
    const userDto: UserDto = {
      id: req.id,
      email: req.email,
    };
    return userDto;
  }
}

export default <IUserMapper>new UserMapper();
