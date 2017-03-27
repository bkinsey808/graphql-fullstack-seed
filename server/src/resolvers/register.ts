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
    console.log(context.headers);
    const queryVariables = [
      args.username,
      args.email,
      args.password
    ];
    const sqlQuery = sql('register.sql');
    let results;
    try {
      results = await context.db.one(sqlQuery, queryVariables);
    } catch (exception) {
      if (exception.message.startsWith('duplicate key value')) {
        if (exception.constraint === 'app_user_email_key') {
          throw new Error('Email Address already registered.');
        } else if (exception.constraint === 'app_user_username_key'){
          throw new Error('Username already registered.');
        }
      } else {
        console.log(exception);
        throw new Error('Unknown error while trying to register. Please try again later.');
      }
    }
    return {
      ...results,
      token: createToken({id: results.id}),
    };
  };
