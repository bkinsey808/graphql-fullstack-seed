import { makeExecutableSchema } from 'graphql-tools';
import { AppUser } from './entity/AppUser';
import { getEntityTypeDefs } from './getEntityTypeDefs';

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
    user(id: Int): User
  }
  type Mutation {
    createUser(
      firstName: String!, 
      lastName: String!
    ): User
    deleteUser(
      id: Int!
    ): Boolean
    updateUser(
      id: Int!
      firstName: String
      lastName: String
    ): User
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    async users(root, args, context) {
      return await context.connection
        .getRepository(AppUser)
        .createQueryBuilder('user')
        .getMany();
    },
    async user(root, args, context) {
      return await context.connection
        .getRepository(AppUser)
        .findOneById(args.id);
    }
  },
  Mutation: {
    async createUser(root, args, context) {
      const user = new AppUser(args);
      await context.connection.entityManager.persist(user);
      return user;
    },
    async deleteUser(root, args, context) {
      const repository = context.connection.getRepository(AppUser);
      const user = await repository.findOneById(args.id);
      if (!user) { throw new Error('No user found'); }
      await repository.remove(user);
      return true;
    },
    async updateUser(root, args, context) {
      const repository = context.connection.getRepository(AppUser);
      const user = await repository.findOneById(args.id);
      if (!user) { throw new Error('No user found'); }
      Object.assign(user, args);
      await repository.persist(user);
      return user;
    }
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
