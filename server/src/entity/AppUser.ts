import {
  Entity,
  PrimaryColumn,
  Column
} from 'typeorm';

import { EntityApi, ColumnApi } from '../api';


@EntityApi({
  typeName: 'user',
  queries: [
    { pattern: 'index', type: 'query', access: 'all'},
    { pattern: 'details', type: 'query', access: 'all'},
    { pattern: 'create', type: 'mutation', access: 'all'},
    { pattern: 'update', type: 'mutation', access: 'all'},
    { pattern: 'delete', type: 'mutation', access: 'all'},
  ]
})
@Entity()
export class AppUser {

  /*@ColumnApi({read: 'all', write: 'all'})*/
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

// console.log(Reflect.getMetadata('EntityApiDecorator', AppUser));
