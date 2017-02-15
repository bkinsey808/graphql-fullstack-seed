import * as pluralize from 'pluralize';
import * as capitalize from 'capitalize';
import { getEntityApiName } from './entityDecorator';

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
  return {
    typeDef: `${apiName}(id: Int): ${capitalize(apiName)}`,
    async resolver(root, args, context) {
      return await context.connection
        .getRepository(entity)
        .findOneById(args.id);
    }
  };
};
