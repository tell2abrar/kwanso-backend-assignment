import 'reflect-metadata';
import env from './config/env';
import express, { Application } from 'express';
import manager from './db';
import { CommonRoutesConfig } from './common/routes.config';
import { AuthRoutes } from './modules/auth/routes';
import configureExpress from './config/express';
import { UserRoutes } from './modules/user/routes';

const configureRoutes = (app: Application): Array<CommonRoutesConfig> => {
  const routes: Array<CommonRoutesConfig> = [];
  routes.push(new AuthRoutes(app));
  routes.push(new UserRoutes(app));

  return routes;
};

const initApp = async () => {
  await manager.init();

  const app = configureExpress();
  const port = env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
    return;
  });

  const routes = configureRoutes(app);

  routes.forEach((route: CommonRoutesConfig) => {
    console.info(`Routes configured for ${route.getName()}`);
  });
};

initApp().catch((error) => console.error(error));

export default manager.datasource;
