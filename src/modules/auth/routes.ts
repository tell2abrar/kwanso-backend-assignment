import AuthController from './controller';
import { Application } from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): Application {
    this.app.route('/login').post(AuthController.login);
    return this.app;
  }
}
