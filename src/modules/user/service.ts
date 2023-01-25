import UserMapper from './mapper';
import {
  CreateUserDto,
  UserDto,
  RegisterResponse,
  GetUserResponse,
} from './dto';
import { User } from '../../db/entities';
import { IUserService } from './interface';
import dbManager from '../../db';
import { getHashedPassword } from './utils';
import { HTTP400Error } from '../../errors/http400.error';
import { Repository } from 'typeorm';
import { SessionPayloadDto } from '../auth/dto';
import AuthMapper from '../auth/mapper';
import { SessionInfo } from '../auth/interface';
import AuthService from '../auth/service';
import { HTTP404Error, HTTP500Error } from '../../errors';

class UserService implements IUserService {
  private userRepo: Repository<User>;
  constructor() {
    this.userRepo = dbManager.getRepository(User);
  }

  getUser = async (userId: number): Promise<GetUserResponse> => {
    const userFound = await this.userRepo.findOne({ where: { id: userId } });
    if (!userFound) throw new HTTP404Error('user not found');
    const responseToSend: UserDto = UserMapper.entityToDto(userFound);
    return { user: responseToSend };
  };

  register = async (req: CreateUserDto): Promise<RegisterResponse | null> => {
    const alreadyExist = await this.userRepo.findOne({
      where: { email: req.email },
    });
    if (alreadyExist) throw new HTTP400Error('User Already Exists');

    req.password = await getHashedPassword(req.password);
    req.email = req.email.toLowerCase();
    const userObj: Partial<User> = UserMapper.dtoToEntity(req);

    const user: User | null = await this.userRepo.save(userObj);
    if (!user) throw new HTTP500Error('Something went wrong');

    const registerResponse: UserDto = UserMapper.entityToDto(user);

    return {
      user: registerResponse,
    };
  };
}

export default <IUserService>new UserService();
