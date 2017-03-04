import { GraphQLSchema } from 'graphql';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';

import { getApiSchema } from 'graphql-api-builder';

import { dbObjects } from './db';
import { objectApis } from './apiObjects';


const context = {
  ...dbObjects
};

const schema: GraphQLSchema = getApiSchema(objectApis);

const appGraphqlExpress = graphqlExpress({
  schema,
  context
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
