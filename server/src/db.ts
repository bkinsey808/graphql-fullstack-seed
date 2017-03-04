import * as pgp from 'pg-promise';


const cn: pgp.IConfig = {
  host: 'localhost',
  port: 5432,
  database: 'app_database',
  user: 'app_database',
  password: 'app_database_password'
};

const pgpMain: pgp.IMain = pgp();
const db = pgpMain(cn);

export const dbObjects = {
  pgpMain,
  db
};
