declare var require: any;

import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';
import { PersistedQueryNetworkInterface } from 'persistgraphql';

const queryMap = require('../../../extracted_queries.json');

const networkInterface = new PersistedQueryNetworkInterface({
  queryMap,
  uri: 'http://localhost:3000/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({ networkInterface });

export function getClient(): ApolloClient {
  return client;
}

