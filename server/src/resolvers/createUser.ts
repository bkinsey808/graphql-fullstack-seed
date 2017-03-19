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


export const createUserResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }

    const result = await context.db.query(sql('createUser.sql'), [
      args.username,
      args.email,
      args.password
    ]);
    // todo: at least return the id of the new user
    return true;
  };
