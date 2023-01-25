import 'reflect-metadata';
import env from './config/env';
import express from 'express';
import manager from './db';

const main = async () => {
  await manager.init();

  const app = express();
  const port = env.PORT || 5000;

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
    return;
  });
};

main();

export default manager.datasource;
