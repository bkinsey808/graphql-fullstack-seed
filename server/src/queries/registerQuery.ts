import {
  QueryApi,
  QueryApiResult,
  ObjectApi,
  FieldApi,
  getFieldDef,
  getCreateFields
} from 'graphql-api-builder';


export const registerQuery: QueryApi =
  (objectApi: ObjectApi): QueryApiResult => {
    const resolverName = 'register';
    const createFields = getCreateFields(objectApi);
    const typeDef = `${resolverName}(\n${createFields}\n): TokenResult`;
    return {
      resolverName,
      typeDef,
      description: 'register a new user',
      resolver: objectApi.getResolver('register', objectApi)
    };
  };
