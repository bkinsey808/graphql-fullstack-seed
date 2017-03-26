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

import { createToken } from '../jwt';


export const registerResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }

    const results = await context.db.query(sql('register.sql'), [
      args.username,
      args.email,
      args.password
    ]);
    return {
      ...results[0],
      token: createToken({id: results[0].id}),
    };
  };
