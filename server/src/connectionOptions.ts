import { ConnectionOptions } from './lib/typeorm';
import { AppUser } from './entity/AppUser';


const connectionOptions: ConnectionOptions = {
  driver: {
    type: 'postgres',
    username: 'app_database', // env var: PGUSER
    database: 'app_database', // env var: PGDATABASE
    password: 'app_database_password', // env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
  },
  entities: [
    AppUser
  ],
  autoSchemaSync: true
};

export default connectionOptions;
