import jwt from 'jsonwebtoken';
import AuthMapper from './mapper';
import env from '../../config/env';
import { User } from '../../db/entities';
import { IAuthService, JwtToken, SessionInfo } from './interface';
import { LoginInputDto, LoginResponseDto, SessionPayloadDto } from './dto';
import { Repository } from 'typeorm';
import dbManager from '../../db';
import { matchPassword } from './utils';
import { UserDto } from '../user/dto';
import { HTTP400Error, HTTP403Error } from '../../errors';

const { JWT_ACCESS_KEY } = env;

class AuthService implements IAuthService {
  private userRepo: Repository<User>;
  constructor() {
    this.userRepo = dbManager.getRepository(User);
  }

  login = async ({
    email,
    password,
  }: LoginInputDto): Promise<LoginResponseDto> => {
    if (!email && !password) throw new HTTP400Error('Invalid Credentails');

    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) throw new HTTP400Error('Invalid Credentials');
    if (!(await matchPassword(password, user.password)))
      throw new HTTP400Error('Invalid Credetials');

    const userPayload: SessionPayloadDto = AuthMapper.createSessionDto(user);
    const { accessToken }: SessionInfo = this.createSession(userPayload);

    return {
      jwt: accessToken,
    };
  };

  verifyAccessToken = async (accessToken: string): Promise<UserDto | null> => {
    let decodedJWT: any;
    jwt.verify(accessToken, JWT_ACCESS_KEY, (error, session) => {
      if (error) {
        throw new HTTP403Error('forbidden');
      }
      decodedJWT = session;
    });

    const data: UserDto | null = await this.userRepo.findOne({
      where: { id: decodedJWT.id },
    });
    const user = data;
    return user;
  };

  createSession = (payload: SessionPayloadDto): SessionInfo => {
    try {
      const accessToken: JwtToken = this.createJwt(
        payload,
        500000,
        JWT_ACCESS_KEY
      );
      return {
        accessToken,
      };
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };

  private createJwt = (
    payload: SessionPayloadDto,
    expiry: number,
    secret: string
  ): JwtToken => {
    if (!secret) throw new Error('Invalid Secret');

    const token = jwt.sign(payload, secret, {
      expiresIn: expiry,
    });

    return {
      token,
      expiry,
    };
  };
}

export default <IAuthService>new AuthService();
