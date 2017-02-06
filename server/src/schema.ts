import { makeExecutableSchema } from 'graphql-tools';

function gql(x) {
  return x.join();
}

const typeDefs = [gql`
  type User {
    id: Int!
    firstName: String
    lastName: String
  }
  type Query {
    users: [User]
  }
  schema {
    query: Query
  }
`];

const resolvers = {
  Query: {
    users(root, args, context) {
      return [{
        id: 1,
        firstName: 'Ben',
        lastName: 'Kinsey!'
      }];
    }
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
});