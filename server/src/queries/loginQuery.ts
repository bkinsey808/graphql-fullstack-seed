import {
  QueryApi,
  QueryApiResult,
  ObjectApi,
  FieldApi,
  getFieldDef
} from 'graphql-api-builder';


const getLoginFields = (objectApi: ObjectApi) =>
  objectApi.fields
    .filter(
    (fieldApi: FieldApi) =>
      ['username', 'password'].includes(fieldApi.apiField)
    )
    .map(
    (fieldApi: FieldApi) =>
      getFieldDef(fieldApi, fieldApi.apiField === 'password')
    )
    .join();

export const loginQuery: QueryApi =
  (objectApi: ObjectApi): QueryApiResult => {
    const resolverName = 'login';
    const loginFields = getLoginFields(objectApi);
    const typeDef = `${resolverName}(\n${loginFields}\n): User`;
    return {
      resolverName,
      typeDef,
      description: 'the login query',
      resolver: objectApi.getResolver('login', objectApi)
    };
  };
