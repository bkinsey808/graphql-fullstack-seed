import { ObjectApi } from 'graphql-api-builder';

import { getResolver } from '../resolvers';


export const RegisterResult: ObjectApi = {
  apiObject: 'RegisterResult',
  description: 'result of a successful registration',
  fields: [{
    apiField: 'id',
    primary: true,
    apiType: 'String',
    description: 'unique identifier',
    allowedForView: true,
    inDb: true,
  }, {
    apiField: 'id',
    apiType: 'String',
    description: 'user id',
    requiredForCreate: false,
    allowedForUpdate: false,
    allowedForView: true,
    inDb: false,
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
