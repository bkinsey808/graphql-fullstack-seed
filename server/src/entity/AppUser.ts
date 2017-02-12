import {
  Entity,
  PrimaryColumn,
  Column
} from 'typeorm';

import { EntityApi } from '../api';

// just a no-op so I can use GraphQL for VSCode extension for syntax highlighting
const gql = x => x.join();

@EntityApi({
  entityTypeDef: gql`
    type User {
      id: Int!
      firstName: String
      lastName: String
    }
  `,
  queries: [{
    typeDef: gql`users: [User]`,
    async resolver(root, args, context) {
      return await context.connection
        .getRepository(AppUser)
        .createQueryBuilder('user')
        .getMany();
      }
  }, {
    typeDef: gql`user(id: Int): User`,
    async resolver(root, args, context) {
      return await context.connection
        .getRepository(AppUser)
        .findOneById(args.id);
    }
  }],
  mutations: [{
    typeDef: gql`createUser(
        firstName: String!, 
        lastName: String!
      ): User`,
    async resolver(root, args, context) {
      return await context.connection
        .getRepository(AppUser)
        .createQueryBuilder('user')
        .getMany();
    }
  }, {
    typeDef: gql`deleteUser(
        id: Int!
      ): Boolean`,
    async resolver(root, args, context) {
      const repository = context.connection.getRepository(AppUser);
      const user = await repository.findOneById(args.id);
      if (!user) { throw new Error('No user found'); }
      await repository.remove(user);
      return true;
    }
  }, {
    typeDef: gql`updateUser(
        id: Int!
        firstName: String
        lastName: String
      ): User`,
    async resolver(root, args, context) {
      const repository = context.connection.getRepository(AppUser);
      const user = await repository.findOneById(args.id);
      if (!user) { throw new Error('No user found'); }
      Object.assign(user, args);
      await repository.persist(user);
      return user;
    }
  }]
})
@Entity()
export class AppUser {

  @PrimaryColumn('int', { generated: true })
  id: number;

  @Column('string', { nullable: true })
  firstName: string;

  @Column('string', { nullable: true })
  lastName: string;

  constructor(properties = {}) {
    Object.assign(this, properties);
  }
}
