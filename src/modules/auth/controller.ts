import { Request } from 'express';
import { catchAsync } from '../../common';
import { LoginResponseDto } from './dto';
import AuthService from './service';

class AuthController {
  login = catchAsync<LoginResponseDto>(async (req: Request) => {
    const { body } = req;
    return await AuthService.login(body);
  });
}

export default new AuthController();
