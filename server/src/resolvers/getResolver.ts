import { createUserResolver } from './createUser';
import { loginResolver } from './login';
import {
  indexResolver,
  detailResolver,
  updateResolver,
  deleteResolver,
  createResolver
} from './common';

const resolvers = {
  index: indexResolver,
  detail: detailResolver,
  update: updateResolver,
  delete: deleteResolver,
  create: createResolver,
  login: loginResolver
};

export const getResolver = (resolverType, objectApi) => {
  if (resolverType === 'create' && objectApi.apiObject === 'User') {
    return createUserResolver(objectApi);
  }
  return resolvers[resolverType](objectApi);
};
