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


export const loginResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }
    const queryVariables = [
      args.usernameOrEmail,
      args.password,
    ];
    const sqlQuery = sql('login.sql');
    let results;
    try {
      results = await context.db.one(sqlQuery, queryVariables);
    } catch (error) {
      throw new Error('Login failed. Check your username or email and password.');
    }
    return {
      ...results,
      token: createToken({ id: results.id }),
    };

  };
