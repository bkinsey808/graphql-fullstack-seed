import {
  Entity,
  PrimaryColumn,
  Column
} from 'typeorm';


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
