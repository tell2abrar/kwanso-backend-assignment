import UserController from './controller';
import ValidateMiddleware from '../../common/validate.middleware';
import { Application } from 'express';
import { CreateUserDto } from './dto';
import { CommonRoutesConfig } from '../../common/routes.config';
import authMiddleware from '../../common/auth.middleware';

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/register')
      .post(
        ValidateMiddleware.validate(CreateUserDto),
        UserController.register
      );

    this.app
      .route('/user')
      .get(authMiddleware.authorization, UserController.getUser);

    return this.app;
  }
}
