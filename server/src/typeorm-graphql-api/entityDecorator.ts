import 'reflect-metadata';
import * as capitalize from 'capitalize';

import { getColumnsMetadata } from './columnDecorator';
import { getField } from './util';

const ENTITY_METADATA_KEY = 'EntityApiDecorator';

export interface EntityApiOptions {
  apiName: String;
  apiDescription: String;
  queries: Array<any>;
  mutations: Array<any>;
}

export const EntityApi = (options: EntityApiOptions) =>
  (target: Function) =>
    Reflect.defineMetadata(ENTITY_METADATA_KEY, options, target);

const getEntityMetadata = entity =>
  Reflect.getMetadata(ENTITY_METADATA_KEY, entity);

export const getEntityApiName = entity => getEntityMetadata(entity).apiName;

const getEntityApiDescription = entity =>
  getEntityMetadata(entity).apiDescription;

export const getEntityTypeDef = entity => {
  const apiName = getEntityApiName(entity);
  const apiDescription = getEntityApiDescription(entity);
  const initialValue =
    (apiDescription ? `#${apiDescription}\n` : '') +
    `type ${capitalize(apiName)} {\n`;
  const columnsMetadata = getColumnsMetadata(entity);
  const entityTypeDef = columnsMetadata.reduce((prev, curr) =>
    prev += getField(curr, false), initialValue
  ) + '}\n';
  return entityTypeDef;
};

export const getQueriesOrMutations = (entity, queriesOrMutations) =>
  getEntityMetadata(entity)[queriesOrMutations];
