import {
  ObjectApi,
  getIndexQuery,
  getDetailQuery,
  getCreateQuery,
  getUpdateQuery,
  getDeleteQuery
} from 'graphql-api-builder';

import { loginQuery } from '../queries';
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
    getCreateQuery,
    getDeleteQuery,
    getUpdateQuery,
    loginQuery
  ],
  fields: [{
    apiField: 'id',
    primary: true,
    apiType: 'String',
    description: 'unique identifier',
    allowedForView: true
  }, {
    apiField: 'username',
    apiType: 'String',
    description: 'public identifier',
    requiredForCreate: true,
    allowedForUpdate: true,
    allowedForView: true
  }, {
    apiField: 'email',
    apiType: 'String',
    description: 'email address',
    requiredForCreate: true,
    allowedForUpdate: true,
    allowedForView: true
  }, {
    apiField: 'password',
    apiType: 'String',
    description: 'secret password',
    requiredForCreate: true,
    allowedForUpdate: true,
    allowedForView: false
  }],
  getResolver
};
