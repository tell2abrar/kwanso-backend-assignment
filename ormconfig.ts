import env from './src/config/env';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const rootDir = __dirname + '/src/db';

const defaultConfig = {
  type: 'postgres',
  url: env.DATABASE_URL,
  synchronize: false,
  migrationsTableName: 'migration',
  entities: [rootDir + '/entities/*.{js,ts}'],
  migrations: [rootDir + '/migrations/*.{js,ts}'],
  seeds: [rootDir + '/seeds/*.{js,ts}'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    entitiesDir: [rootDir + '/entities'],
    migrationsDir: rootDir + '/migrations',
  },
};

export default env.NODE_ENV === 'production' || env.NODE_ENV === 'staging'
  ? {
      ...defaultConfig,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      ...defaultConfig,
      logging: false,
      logger: 'simple-console',
    };
