import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';
import { createConnection } from './lib/typeorm';
import { getApiSchema } from './typeorm-graphql-api';

import connectionOptions from './connectionOptions';
import { AppUser } from './entity/AppUser';
import { UserRole } from './entity/UserRole';


const entityArray = [
  UserRole,
  AppUser
];

const context = {
  connection: null
};

createConnection(connectionOptions)
  .then(connection => context.connection = connection)
  .catch(error => console.log('TypeOrm error', error));

const schema = getApiSchema(entityArray);
console.log(schema);

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
  .use('/', express.static(path.join(__dirname, '../../client/dist')))
  .listen(PORT);
