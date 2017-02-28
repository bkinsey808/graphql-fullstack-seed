import * as pluralize from 'pluralize';
import * as capitalize from 'capitalize';

import { getEntityApiName } from './entityDecorator';
import {
  getIdField,
  getCreateFields,
  getUpdatableFields
} from './util';


export const getIndexQuery = entity => {
  const apiName = getEntityApiName(entity);
  return {
    typeDef: `${pluralize(apiName)}: [${capitalize(apiName)}]`,
    apiDescription: `the index query of ${pluralize(apiName)}`,
    resolver: async (root, args, context) => {
      return await context.connection
        .getRepository(entity)
        .createQueryBuilder(apiName)
        .getMany();
    }
  };
};

export const getDetailsQuery = entity => {
  const apiName = getEntityApiName(entity);
  const idField = getIdField(entity);
  return {
    typeDef: `${apiName}(\n${idField}): ${capitalize(apiName)}`,
    apiDescription: `the details query of a ${apiName}`,
    async resolver(root, args, context) {
      return await context.connection
        .getRepository(entity)
        .findOneById(args.id);
    }
  };
};

export const getCreateQuery = entity => {
  const apiName = getEntityApiName(entity);
  return {
    typeDef: `createUser(\n${getCreateFields(entity)}\n): ${capitalize(apiName)}`,
    apiDescription: `mutation to create a ${apiName}`,
    async resolver(root, args, context) {
      const repository = context.connection.getRepository(entity);
      const instance = new entity();
      Object.assign(instance, args);
      await repository.persist(instance);
      return instance;
    }
  };
};

export const getDeleteQuery = entity => {
  const apiName = getEntityApiName(entity);
  return {
    typeDef: `deleteUser(\n${getIdField(entity)}\n): Boolean`,
    apiDescription: `mutation to delete a ${apiName}`,
    async resolver(root, args, context) {
      const repository = context.connection.getRepository(entity);
      const instance = await repository.findOneById(args.id);
      if (!instance) { throw new Error(`No ${apiName} found`); }
      await repository.remove(instance);
      return true;
    }
  };
};

export const getUpdateQuery = entity => {
  const apiName = getEntityApiName(entity);
  return {
    typeDef: `updateUser(
      ${getIdField(entity)}${getUpdatableFields(entity)}
    ): ${capitalize(apiName)}`,
    apiDescription: `mutation to update a ${apiName}`,
    async resolver(root, args, context) {
      const repository = context.connection.getRepository(entity);
      const instance = await repository.findOneById(args.id);
      if (!instance) { throw new Error(`No ${apiName} found`); }
      Object.assign(instance, args);
      await repository.persist(instance);
      return instance;
    }
  };
};
