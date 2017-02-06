import * as express from 'express';
import * as bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';
import * as pg from 'pg';

import schema from './schema';
import dbConfig from './db-config';

const pool = new pg.Pool(dbConfig);
// if an error is encountered by a client while it sits idle in the pool
// the pool itself will emit an error event with both the error and
// the client which emitted the original error
// this is a rare occurrence but can happen if there is a network partition
// between your application and the database, the database restarts, etc.
// and so you might want to handle it and at least log it out
pool.on(
  'error',
  (err, client) => console.error('idle client error', err.message, err.stack)
);

const appGraphqlExpress = graphqlExpress({
  schema: schema,
  context: {
    pool: pool
  }
});

const appGraphiqlExpress = graphiqlExpress({
  endpointURL: '/graphql',
});

const PORT = 3000;

express()
  .use('/graphql', bodyParser.json(), appGraphqlExpress)
  .use('/graphiql', appGraphiqlExpress)
  .listen(PORT);
