import * as pgp from 'pg-promise';


const config: pgp.IConfig = {
  host: 'localhost',
  port: 5432,
  database: 'app_database',
  user: 'app_database',
  password: 'app_database_password'
};

const pgpMain = pgp();
export const db = pgpMain(config);
