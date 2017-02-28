import { getMetadataArgsStorage } from '../lib/typeorm';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

import {
  getEntityTypeDef,
  getQueriesOrMutations
} from './entityDecorator';
import { pairsToObject } from './util';

const getEntityTypeDefs = entityArray => {
  return entityArray
    .map(entity => getEntityTypeDef(entity))
    .join('');
};

const maybeAddDescription = query => {
  return (query.apiDescription ? `#${query.apiDescription}\n` : '') +
    `${query.typeDef}\n`;
};

const maybeExecuteFunction = (query, entity) =>
  typeof query === 'function' ? query(entity) : query;

const getEntityQueryTypeDefs = (entity, queriesOrMutations) => {
  return getQueriesOrMutations(entity, queriesOrMutations)
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

const getQueryTypeDef =
  entityArray => getTypeDefFor(entityArray, 'queries', 'Query');

const getMutationTypeDef =
  entityArray => getTypeDefFor(entityArray, 'mutations', 'Mutation');

const getQueryName = typeDef => {
  const td = typeDef.replace(/^#.*\n?/m, '').trim();
  const r = td.substring(0, td.match(/([^A-Z])/i).index);
  return r;
};

const getQueryResolverPairsForEntity = (entity, queriesOrMutations) =>
  getQueriesOrMutations(entity, queriesOrMutations)
    .map(query => maybeExecuteFunction(query, entity))
    .map(query => [
      getQueryName(query.typeDef),
      query.resolver
    ]);

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
