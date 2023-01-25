import express from 'express';

const configureExpress = () => {
  const app = express();
  app.use((req, res, next) => {
    (express.urlencoded({ extended: true }), express.json())(req, res, next);
  });

  return app;
};
export default configureExpress;
