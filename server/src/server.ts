import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';
import { createConnection } from 'typeorm';
import { getApiSchema } from 'typeorm-graphql-api';

import connectionOptions from './connectionOptions';
import { AppUser } from './entity/AppUser';


const entityArray = [
  AppUser
  // moar entities go here
];

const context = {
  connection: null
};

createConnection(connectionOptions)
  .then(connection => context.connection = connection)
  .catch(error => console.log('TypeOrm error', error));

const appGraphqlExpress = graphqlExpress({
  schema: getApiSchema(entityArray),
  context: context
});

const appGraphiqlExpress = graphiqlExpress({
  endpointURL: '/graphql',
});

const PORT = 3000;

express()
  .use('/graphql', bodyParser.json(), appGraphqlExpress)
  .use('/graphiql', appGraphiqlExpress)
  .use('/', express.static(path.join(__dirname, '../../client/dist')))
  .listen(PORT);
