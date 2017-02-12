import { makeExecutableSchema } from 'graphql-tools';

import {
  getEntityTypeDefs,
  getQueryTypeDef,
  getMutationTypeDef,
  getQueryResolvers,
  getMutationResolvers
} from './api';
import { AppUser } from './entity/AppUser';


const entityArray = [
  AppUser
  // moar entities go here
];

// extend if there are any typedefs NOT from entity array
const typeDefs =
  getEntityTypeDefs(entityArray) +
  getQueryTypeDef(entityArray) +
  getMutationTypeDef(entityArray);

// extend if there are any queries or resolvers NOT from entity array
const resolvers = {
  Query: getQueryResolvers(entityArray),
  Mutation: getMutationResolvers(entityArray)
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
