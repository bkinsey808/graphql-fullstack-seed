declare var require: any;

import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';
import { PersistedQueryNetworkInterface } from 'persistgraphql';

import { AuthService } from './services/auth.service';


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
    const token = AuthService.getJwtToken();
    if (token) {
      req.options.headers['authorization'] = AuthService.getJwtToken();
      console.log('got token: ', token);
    } else {
      console.log('did not get token', console.log(localStorage.getItem('id_token')));
    }
    next();
  }
}]);

const client = new ApolloClient({ networkInterface });

export function getClient(): ApolloClient {
  return client;
}
