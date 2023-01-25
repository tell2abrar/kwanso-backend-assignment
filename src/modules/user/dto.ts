import { SessionInfo } from '../auth/interface';
import { Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @Length(6, 255)
  password: string;

  @IsEmail()
  @Length(3, 255)
  email: string;
}

export class UserDto {
  id: number;
  email: string;
}

export class RegisterResponse {
  user: UserDto;
  session: SessionInfo;
}
