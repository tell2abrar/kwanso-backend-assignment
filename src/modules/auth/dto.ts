import { IsEmail, Length } from 'class-validator';
import { User } from '../../db/entities';
import { SessionInfo } from './interface';

export class LoginInputDto {
  @Length(3, 255)
  @IsEmail()
  email: string;

  @Length(6, 255)
  password: string;
}

export class SessionPayloadDto {
  id: number;
  email: string;
}

export interface LoginResponseDto {
  user: User;
  session: SessionInfo;
}
