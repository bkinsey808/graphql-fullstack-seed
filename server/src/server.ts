declare var require: any;

import { GraphQLSchema } from 'graphql';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';
import { invert } from 'lodash';
import { getExecutableSchema } from 'graphql-api-builder';

import { dbObjects } from './db';
import { objectApis } from './apiObjects';

// What's the best way to import a json file without require?
// Can anybody enlighten me?
const queryMap = require('../../extracted_queries.json');

const context = { ...dbObjects};

const schema: GraphQLSchema = getExecutableSchema(objectApis);

const appGraphqlExpress = graphqlExpress({
  schema,
  context
});

const appGraphiqlExpress = graphiqlExpress({
  endpointURL: '/graphql',
});

const corsWhitelist = [
  'http://localhost:4200',
];
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = corsWhitelist.includes(origin);
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

const PORT = 3000;

const persistedQueryMiddleware = (req, resp, next) => {
  const invertedMap = invert(queryMap);
  // todo remove && req.body.id on production for query whitelisting
  if (req.body && req.body.id) {
    req.body.query = invertedMap[req.body.id];
  }
  next();
}

express()
  .use(cors(corsOptions))
  .use('/graphql', bodyParser.json())
  .use('/graphql', persistedQueryMiddleware)
  .use('/graphql', appGraphqlExpress)
  .use('/graphiql', appGraphiqlExpress)
  .use('/', express.static(path.join(__dirname, '../../client/dist')))
  .listen(PORT);
