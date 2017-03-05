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


export const loginResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }
    const result = await context.db.one(sql('login.sql'), [
      args.username,
      args.password
    ]);
    console.log(result);
    return result;
  };


/*

mutation {
  createUser(username:"myusername", password:"my password", email: "Bkinsey3@gmail.com")
}

*/
