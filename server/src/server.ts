import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as pg from 'pg';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';

import schema from './schema';
import connectionOptions from './db-config';
import { createConnection } from 'typeorm';


const context = {
  connection: null
};

createConnection(connectionOptions)
  .then(connection => context.connection = connection)
  .catch(error => console.log('TypeOrm error', error));

const appGraphqlExpress = graphqlExpress({
  schema: schema,
  context: context
});

const appGraphiqlExpress = graphiqlExpress({
  endpointURL: '/graphql',
});

const PORT = 3000;

express()
  .use('/graphql', bodyParser.json(), appGraphqlExpress)
  .use('/graphiql', appGraphiqlExpress)
  .listen(PORT);
