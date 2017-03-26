import { ObjectApi } from 'graphql-api-builder';

import { getResolver } from '../resolvers';


export const TokenResult: ObjectApi = {
  apiObject: 'TokenResult',
  description: 'result of a successful registration',
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
    description: 'the unique username',
    requiredForCreate: false,
    allowedForUpdate: false,
    allowedForView: true,
    inDb: true,
  }, {
    apiField: 'token',
    apiType: 'String',
    description: 'jwt token',
    requiredForCreate: false,
    allowedForUpdate: false,
    allowedForView: true,
    inDb: false,
  }],
  queryApis: [],
  mutationApis: [],
  getResolver,
};
