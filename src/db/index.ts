import ormconfig from '../../ormconfig';
import { DataSource, EntityTarget, Repository } from 'typeorm';

class DbManager {
  public datasource: DataSource;

  constructor() {
    this.datasource = new DataSource({
      ...ormconfig,
      type: 'postgres',
      logger: 'simple-console',
    });
  }

  async init() {
    await this.datasource
      .initialize()
      .then(() => console.log('Database connected'))
      .catch((error) =>
        console.log('Something went wrong while connecting database', error)
      );
  }

  getRepository(repo: EntityTarget<any>): Repository<any> {
    return this.datasource.getRepository(repo);
  }
}

export default new DbManager();
