import * as pgp from 'pg-promise';
import {
  ObjectApi,
  QueryApi,
  QueryApiResult,
  FieldApi,
  getViewableFields
} from 'graphql-api-builder';

import {
  isPgp,
  sql
} from './utils';


export const registerResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }

    const result = await context.db.query(sql('register.sql'), [
      args.username,
      args.email,
      args.password
    ]);
    console.log('register result: ', result);
    const id = result[0].id;
    console.log(id);
    // todo: at least return the id of the new user
    return 'new jwt will go here';
  };
