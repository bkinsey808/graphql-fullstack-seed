import * as express from 'express';
import * as bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';
import { createConnection } from 'typeorm';

import schema from './schema';
import connectionOptions from './connectionOptions';


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
