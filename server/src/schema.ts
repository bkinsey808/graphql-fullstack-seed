import { makeExecutableSchema } from 'graphql-tools';

// currently gql tag is implemented as noop. The reason why I do this is I can 
// get syntax highlighting using Kumar Harsh's GraphQL for VSCode syntax highlighting extension.
// If anybody has a better idea, pls let me know.
const gql = x => x;

const typeDefs = gql`
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
`;

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
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
