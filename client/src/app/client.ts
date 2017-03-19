import {
  ApolloClient,
  createNetworkInterface
} from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    opts: {
      credentials: 'omit',
    },
  }),
});

export function getClient(): ApolloClient {
  return client;
}
