import { makeExecutableSchema } from 'graphql-tools';

import { AppUser } from './entity/AppUser';
import { getTypeDefs } from './api';


const entityArray = [
  AppUser
];

const typeDefs = getTypeDefs(entityArray);

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
