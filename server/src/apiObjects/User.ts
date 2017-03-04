import {
  ObjectApi,
  getIndexQuery,
  getDetailQuery,
  getCreateQuery,
  getUpdateQuery,
  getDeleteQuery
// } from '../../../../graphql-api-builder/dist/lib';
// } from '../graphql-api-builder';
} from 'graphql-api-builder';

import { getResolver } from '../getResolver';

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
    getUpdateQuery
  ],
  fields: [{
    apiField: 'id',
    primary: true,
    apiType: 'Int',
    description: 'unique identifier',
    allowedForView: true
  }, {
    apiField: 'username',
    apiType: 'String',
    description: 'public identifier',
    requiredForCreate: true,
    allowedForUpdate: true,
    allowedForView: true
  }],
  getResolver
};
