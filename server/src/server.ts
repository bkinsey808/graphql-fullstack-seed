import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { graphiqlExpress } from 'graphql-server-express';

import { corsMiddleware } from './middleware/cors.middleware';
import { graphqlExpressMiddleware } from './middleware/graphqlExpress.middleware';
import { persistedQueryMiddleware } from './middleware/persistedQuery.middleware';


const PORT = 3000;

// chaining express app calls enforces locality and brevity
// you can think of this as the server overview
express()
  .use(corsMiddleware)
  .use('/graphql', bodyParser.json())
  .use('/graphql', persistedQueryMiddleware)
  .use('/graphql', graphqlExpressMiddleware)
  .use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  .use('/', express.static(path.join(__dirname, '../../client/dist')))
  .listen(PORT);
