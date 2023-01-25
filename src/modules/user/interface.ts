import { User } from '../../db/entities';
import {
  CreateUserDto,
  GetUserResponse,
  RegisterResponse,
  UserDto,
} from './dto';

export interface IUserService {
  register(req: CreateUserDto): Promise<RegisterResponse | null>;
  getUser(userId: number): Promise<GetUserResponse>;
}

export interface IUserMapper {
  dtoToEntity(req: CreateUserDto): Partial<User>;
  entityToDto(req: User): UserDto;
}
