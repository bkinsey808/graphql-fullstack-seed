const ENTITY_METADATA_KEY = 'EntityApiDecorator';

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

export const getEntityApiName = 
  entity => Reflect.getMetadata(ENTITY_METADATA_KEY, entity).apiName;

export const getEntityTypeDef =
  entity => Reflect.getMetadata(ENTITY_METADATA_KEY, entity).entityTypeDef;

export const getQueriesOrMutations = (entity, queriesOrMutations) =>
  Reflect.getMetadata(ENTITY_METADATA_KEY, entity)[queriesOrMutations];
