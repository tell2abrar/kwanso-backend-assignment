import UserService from './service';
import { Request } from 'express';
import { catchAsync } from '../../common';
import { GetUserResponse, RegisterResponse, UserDto } from './dto';

class UserController {
  register = catchAsync<RegisterResponse | null>(async (req: Request) => {
    const { body } = req;
    return await UserService.register(body);
  });

  getUser = catchAsync<GetUserResponse | null>(async (req: Request) => {
    const { user } = req;
    return await UserService.getUser(user.id);
  });
}

export default new UserController();
