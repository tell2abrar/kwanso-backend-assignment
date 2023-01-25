import UserController from './controller';
import ValidateMiddleware from '../../common/validate.middleware';
import { Application } from 'express';
import { CreateTaskDto } from './dto';
import { CommonRoutesConfig } from '../../common/routes.config';
import authMiddleware from '../../common/auth.middleware';

export class TaskRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'TaskRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/create-task')
      .post(
        authMiddleware.authorization,
        ValidateMiddleware.validate(CreateTaskDto),
        UserController.createTask
      );

    this.app
      .route('/list-tasks')
      .get(authMiddleware.authorization, UserController.getAllTasks);

    return this.app;
  }
}
