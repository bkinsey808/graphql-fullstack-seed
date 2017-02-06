import * as express from 'express';
import * as bodyParser from 'body-parser';
import {
  graphqlExpress, 
  graphiqlExpress 
} from 'graphql-server-express';

import schema from './schema';


const appGraphqlExpress = graphqlExpress({ 
  schema: schema 
});

const appGraphiqlExpress = graphiqlExpress({
  endpointURL: '/graphql',
});

const PORT = 3000;

express()
  .use('/graphql', bodyParser.json(), appGraphqlExpress)
  .use('/graphiql', appGraphiqlExpress)
  .listen(PORT);

