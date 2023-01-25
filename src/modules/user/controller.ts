import UserService from './service';
import { Request } from 'express';
import { catchAsync } from '../../common';
import { RegisterResponse } from './dto';

class UserController {
  register = catchAsync<RegisterResponse | null>(async (req: Request) => {
    const { body } = req;
    return await UserService.register(body);
  });
}

export default new UserController();
