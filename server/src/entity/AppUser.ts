import {
  Entity,
  PrimaryColumn,
  Column
} from 'typeorm';

import { EntityApi } from '../api';


@EntityApi({
  typeName: 'User',
  queries: [
    { index: { all: true } },
    { details: { all: true } },
  ],
  mutations: [
    { create: { all: true } },
    { update: { all: true } },
    { delete: { all: true } },
  ]
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

// console.log(Reflect.getMetadata('EntityApiDecorator', AppUser));
