import { makeExecutableSchema } from 'graphql-tools';
import { AppUser } from './entity/AppUser';


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
    async users(root, args, context) {
      const users = await context.connection
        .getRepository(AppUser)
        .createQueryBuilder('user')
        .getMany();
      return users;
    }
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
