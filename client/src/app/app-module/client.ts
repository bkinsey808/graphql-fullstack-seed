declare var require: any;

import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';
import { PersistedQueryNetworkInterface } from 'persistgraphql';


// todo: figure out how to refractor this without require
const queryMap = require('../../../../extracted_queries.json');

const networkInterface = new PersistedQueryNetworkInterface({
  queryMap,
  uri: 'http://localhost:3000/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

// apollo client middleware
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers['authorization'] =
      localStorage.getItem('token') ? localStorage.getItem('token') : null;
    next();
  }
}]);

const client = new ApolloClient({ networkInterface });

export function getClient(): ApolloClient {
  return client;
}
