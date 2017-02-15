import 'reflect-metadata';
import { getMetadataArgsStorage } from 'typeorm';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import * as pluralize from 'pluralize';
import * as capitalize from 'capitalize';


const ENTITY_METADATA_KEY = 'EntityApiDecorator';
const COLUMN_METADATA_KEY = 'ColumnApiDecorator';

export interface EntityApiOptions {
  apiName: String;
  apiDescription: String;
  entityTypeDef: String;
  queries: Array<any>;
  mutations: Array<any>;
}

export const EntityApi = (options: EntityApiOptions) => {
  return function (target: Function) {
    Reflect.defineMetadata(ENTITY_METADATA_KEY, options, target);
  };
};

export interface ColumnApiOptions {
  apiName: String;
  apiType: String;
  updatable?: Boolean;
  requiredForCreate?: Boolean;
}

export const ColumnApi = (options: ColumnApiOptions): PropertyDecorator => {
  return function (target: any) {
    Reflect.defineMetadata(COLUMN_METADATA_KEY, options, target);
  };
};

const getEntityApiName = 
  entity => Reflect.getMetadata(ENTITY_METADATA_KEY, entity).apiName;

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

const getEntityTypeDef =
  entity => Reflect.getMetadata(ENTITY_METADATA_KEY, entity).entityTypeDef;

const getEntityTypeDefs = entityArray => {
  return entityArray
    .map(entity => getEntityTypeDef(entity))
    .join('');
};

const maybeAddDescription = (query) => {
  return (query.apiDescription ? `#${query.apiDescription}\n` : '') +
    `${query.typeDef}\n`;
};

const maybeExecuteFunction = (query, entity) =>
  typeof query === 'function' ? query(entity) : query;

const getQueriesOrMutations = (entity, queriesOrMutations) =>
  Reflect.getMetadata(ENTITY_METADATA_KEY, entity)[queriesOrMutations];

const getEntityQueryTypeDefs = (entity, queriesOrMutations) => {
  const metadata = Reflect.getMetadata(ENTITY_METADATA_KEY, entity);
  return metadata[queriesOrMutations]
    .map(query => maybeExecuteFunction(query, entity))
    .map(query => maybeAddDescription(query))
    .join('');
};

const getTypeDefFor = (entityArray, queriesOrMutations, queryOrMutation) => {
  const entityQueryTypeDefs = entityArray
    .map(entity => getEntityQueryTypeDefs(entity, queriesOrMutations))
    .join('');
  return `type ${queryOrMutation} {
    ${entityQueryTypeDefs}
  }
  `;
};

export const getQueryTypeDef =
  entityArray => getTypeDefFor(entityArray, 'queries', 'Query');

export const getMutationTypeDef =
  entityArray => getTypeDefFor(entityArray, 'mutations', 'Mutation');

const getQueryName = typeDef => {
  const td = typeDef.replace(/^#.*\n?/m, '').trim();
  const r = td.substring(0, td.match(/([^A-Z])/i).index);
  return r;
};

const getQueryResolverPairsForEntity = (entity, queriesOrMutations) => {
  return getQueriesOrMutations(entity, queriesOrMutations)
    .map(query => maybeExecuteFunction(query, entity))
    .map(query => [
      getQueryName(query.typeDef),
      query.resolver
    ]);
};

const pairsToObject = (pairs) => {
  return pairs.reduce((prev, curr) => {
    prev[curr[0]] = curr[1];
    return prev;
  }, {});
};

// returns an object: 
//   key is the name of the query or mutation
//   values are the resolvers
const getResolversFor = (entityArray, queriesOrMutations) => {
  const queryResolverPairs =
    entityArray.reduce((pairs, entity) => {
      const queryResolverPairsForEntity =
        getQueryResolverPairsForEntity(entity, queriesOrMutations);
      return pairs.concat(queryResolverPairsForEntity);
    }, []);
  return pairsToObject(queryResolverPairs);
};

export const getQueryResolvers =
  entityArray => getResolversFor(entityArray, 'queries');

export const getMutationResolvers =
  entityArray => getResolversFor(entityArray, 'mutations');

export const getApiSchema = entityArray => {
  const typeDefs =
    getEntityTypeDefs(entityArray) +
    getQueryTypeDef(entityArray) +
    getMutationTypeDef(entityArray);
  const resolvers = {
    Query: getQueryResolvers(entityArray),
    Mutation: getMutationResolvers(entityArray)
  };
  console.log(typeDefs);
  return makeExecutableSchema({
    typeDefs,
    resolvers
  });
};

export default getApiSchema;
