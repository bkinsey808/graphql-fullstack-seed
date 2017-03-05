import { createUserResolver } from './createUser';
import * as pgp from 'pg-promise';
import {
  ObjectApi,
  QueryApi,
  QueryApiResult,
  FieldApi,
  getViewableFields
} from 'graphql-api-builder';

import { isPgp } from './utils';

export const indexResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }
    const viewableFields = getViewableFields(objectApi, context).join(', ');
    const sql = `SELECT ${viewableFields} FROM ${objectApi.dbObject}`;
    return await context.db.any(sql);
  };

export const detailResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }
    const viewableFields = getViewableFields(objectApi, context).join(', ');
    const sql = `SELECT ${viewableFields} FROM ${objectApi.dbObject} WHERE id=\${id}`;
    return await context.db.one(sql, {
      id: args.id
    });
  };

export const updateResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }
    const myArgs = Object.assign({}, args);
    delete myArgs.id;

    // generating a set of columns from the object (only once):
    const columnSet = new context.pgpMain.helpers.ColumnSet(myArgs, {
      table: objectApi.dbObject
    });

    const query =
      context.pgpMain.helpers.update(args, columnSet) +
      ` WHERE id = ${args.id}`;
    return await context.db.query(query);
  };

export const deleteResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }
    const query = `DELETE FROM ${objectApi.dbObject} WHERE id = ${args.id}`;
    return await context.db.query(query);
  };

export const createResolver = (objectApi: ObjectApi) =>
  async (root, args, context) => {
    if (!isPgp(context.db)) {
      throw new Error('unsupported db type');
    }

    // see http://stackoverflow.com/questions/16585209/node-js-object-object-has-no-method-hasownproperty
    const myArgs = Object.assign({}, args);

    // generating a set of columns from the object (only once):
    const columnSet = new context.pgpMain.helpers.ColumnSet(myArgs, {
      table: objectApi.dbObject
    });

    // generating the insert query:
    const query = context.pgpMain.helpers.insert(args, columnSet);
    const result = await context.db.query(query);
    return true;
  };
