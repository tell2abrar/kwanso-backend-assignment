import { Application } from 'express';
import UserController from './controller';

import { CommonRoutesConfig } from '../../common/routes.config';
import ValidateMiddleware from '../../common/validate.middleware';

import { CreateUserDto } from './dto';

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

    return this.app;
  }
}
