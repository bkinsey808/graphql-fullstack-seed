import { GraphQLSchema } from 'graphql';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';

import { getExecutableSchema } from 'graphql-api-builder';

import { dbObjects } from './db';
import { objectApis } from './apiObjects';


const context = {
  ...dbObjects
};

const schema: GraphQLSchema = getExecutableSchema(objectApis);

const appGraphqlExpress = graphqlExpress({
  schema,
  context
});

const appGraphiqlExpress = graphiqlExpress({
  endpointURL: '/graphql',
});

const whitelist = [
  'http://localhost:4200',
];
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

const PORT = 3000;

express()
  .use(cors(corsOptions))
  .use('/graphql', bodyParser.json(), appGraphqlExpress)
  .use('/graphiql', appGraphiqlExpress)
  .use('/', express.static(path.join(__dirname, '../../client/dist')))
  .listen(PORT);
