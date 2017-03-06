import * as jwt from 'jsonwebtoken';
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
    const token = jwt.sign({
      username: result.usename,
      id: result.id
    }, 'json_web_token_secret', { expiresIn: 120 });
    return token;
  };
