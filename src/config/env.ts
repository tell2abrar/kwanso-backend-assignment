import { config } from 'dotenv';
import { cleanEnv, str, num } from 'envalid';

config(); //to load env into process.env

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'staging'],
    desc: `Node environement - choices are ['development', 'production','staging']`,
    default: 'development',
  }),
  PORT: num({
    default: 5000,
    desc: 'Port of the express server',
    example: '5000',
  }),
  DATABASE_URL: str({
    desc: 'Url of the database',
  }),
  JWT_ACCESS_KEY: str({
    desc: 'JWT Access key',
  }),
});

export default env;
