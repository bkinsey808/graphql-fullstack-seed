import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinTable
} from 'typeorm';
import {
  EntityApi,
  ColumnApi,
  getIndexQuery,
  getDetailsQuery,
  getCreateQuery,
  getDeleteQuery,
  getUpdateQuery
} from '../typeorm-graphql-api';

import { UserRole } from './UserRole';


@EntityApi({
  apiName: 'user',
  apiDescription: 'people who use our system',
  queries: [
    getIndexQuery,
    getDetailsQuery
  ],
  mutations: [
    getCreateQuery,
    getDeleteQuery,
    getUpdateQuery
  ]
})
@Entity()
export class AppUser {

  @ColumnApi({
    apiName: 'id',
    apiType: 'Int',
    apiDescription: 'unique identifier'
  })
  @PrimaryColumn('int', { generated: true })
  id: number;

  @ColumnApi({
    apiName: 'firstName',
    apiType: 'String',
    apiDescription: 'the first name',
    updatable: true,
    requiredForCreate: true
  })
  @Column('string', { nullable: true })
  firstName: string;

  @ColumnApi({
    apiName: 'lastName',
    apiType: 'String',
    apiDescription: 'the last name',
    updatable: true,
    requiredForCreate: true
  })
  @Column('string', { nullable: true })
  lastName: string;

  @OneToMany(type => UserRole, userRole => userRole.user)
  @JoinTable()
  userRoles: Promise<UserRole[]>;

  constructor(properties = {}) {
    Object.assign(this, properties);
  }
}
