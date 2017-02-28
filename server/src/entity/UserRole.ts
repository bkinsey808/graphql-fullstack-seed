import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne
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

import { AppUser } from './AppUser';


@EntityApi({
  apiName: 'userRole',
  apiDescription: 'roles the user has',
  queries: [
    getIndexQuery,
    getDetailsQuery
  ],
  mutations: [
    getDeleteQuery,
    getUpdateQuery
  ]
})
@Entity()
export class UserRole {

  @ColumnApi({
    apiName: 'id',
    apiType: 'Int',
    apiDescription: 'unique identifier'
  })
  @PrimaryColumn('int', { generated: true })
  id: number;

  @ManyToOne(type => AppUser, user => user.userRoles)
  user: Promise<AppUser>;

  constructor(properties = {}) {
    Object.assign(this, properties);
  }
}
