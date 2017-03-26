import {
  ObjectApi,
  getIndexQuery,
  getDetailQuery,
  getUpdateQuery,
  getDeleteQuery
} from 'graphql-api-builder';

import { loginQuery } from '../queries';
import { registerQuery } from '../queries';
import { getResolver } from '../resolvers';


export const User: ObjectApi = {
  apiObject: 'User',
  dbObject: 'app_user',
  description: 'people who use our system',
  queryApis: [
    getIndexQuery,
    getDetailQuery
  ],
  mutationApis: [
    getDeleteQuery,
    getUpdateQuery,
    registerQuery,
    loginQuery
  ],
  fields: [{
    apiField: 'id',
    primary: true,
    apiType: 'String',
    description: 'unique identifier',
    allowedForView: true,
    inDb: true,
  }, {
    apiField: 'username',
    apiType: 'String',
    description: 'public identifier',
    requiredForCreate: true,
    allowedForUpdate: true,
    allowedForView: true,
    inDb: true,
  }, {
    apiField: 'email',
    apiType: 'String',
    description: 'email address',
    requiredForCreate: true,
    allowedForUpdate: true,
    allowedForView: true,
    inDb: true,
  }, {
    apiField: 'password',
    apiType: 'String',
    description: 'secret password',
    requiredForCreate: true,
    allowedForUpdate: true,
    allowedForView: false,
    inDb: true,
  }],
  getResolver
};
