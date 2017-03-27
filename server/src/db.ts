import * as pgp from 'pg-promise';


const connectionParameters: pgp.IConfig = {
  host: 'localhost',
  port: 5432,
  database: 'app_database',
  user: 'app_database',
  password: 'app_database_password'
};

const pgpMain: pgp.IMain = pgp();
const db: pgp.IDatabase<any> = pgpMain(connectionParameters);

interface DbObjects {
  pgpMain: pgp.IMain;
  db: pgp.IDatabase<any>;
}

export const dbObjects: DbObjects = {
  pgpMain,
  db
};
