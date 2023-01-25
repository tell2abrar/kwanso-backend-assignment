import { Request } from 'express';
import { User } from '../../db/entities';
import { UserDto } from '../user/dto';
import { LoginInputDto, LoginResponseDto, SessionPayloadDto } from './dto';

export interface IAuthService {
  login(req: LoginInputDto): Promise<LoginResponseDto>;
  verifyAccessToken(accessToken: string): Promise<UserDto | null>;
  createSession(payload: SessionPayloadDto): SessionInfo;
}

export interface IAuthMapper {
  entityToDto(req: User): UserDto;
  createSessionDto(req: User): SessionPayloadDto;
}

export class JwtToken {
  token: string | undefined;
  expiry: number;
}
export class SessionInfo {
  accessToken: JwtToken;
}

export class Context {
  req: Request;
  user: User;
}
