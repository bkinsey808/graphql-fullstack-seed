import { getMetadataArgsStorage } from 'typeorm';
import * as pluralize from 'pluralize';
import * as capitalize from 'capitalize';

export function EntityApi(options: Object) {
  return function (target: Function) {
    Reflect.defineMetadata('EntityApiDecorator', options, target);
  };
}

export function ColumnApi(options: any) {
  return function (target: any, propertyKey: string) {
//    Reflect.defineMetadata('ColumnApiDecorator', options, target);
  };
}

// clearly this is not the complete implementation!
const typeOrmType2graphqlType =
  typeOrmType => capitalize(typeOrmType);

export const getEntityTypeDef = entity => {
  const metadata = Reflect.getMetadata('EntityApiDecorator', entity);
  const columns = getMetadataArgsStorage().columns.toArray()
    .filter(column => column.target === entity);
  let str = `type ${capitalize(metadata.typeName)} {\n`;
  columns.map(column => {
    const graphqlType = typeOrmType2graphqlType(column.options.type);
    str += `  ${column.propertyName}: ${graphqlType}\n`;
  });
  str += '}\n';
  return str;
};

const getGraphqlType = (entity, columnName) => {
  const columns = getMetadataArgsStorage().columns.toArray()
    .filter(
      column => column.target === entity && column.propertyName === columnName
    );
  const column = columns[0];
  return capitalize(column.options.type);
};

const getQueryTypeDefField = (entity, query) => {
  const metadata = Reflect.getMetadata('EntityApiDecorator', entity);
  const typeName = metadata.typeName;
  const pluralizedTypeName = pluralize(typeName);
  const capitalizedTypeName = capitalize(typeName);
  if (query.hasOwnProperty('index')) {
    return `  ${pluralizedTypeName}: [${capitalizedTypeName}]\n`;
  }
  if (query.hasOwnProperty('details')) {
    const idGraphqlType = getGraphqlType(entity, 'id');
    return `  ${typeName}(id: ${idGraphqlType}!): ${capitalizedTypeName}\n`;
  }
  if (query.hasOwnProperty('createUesr')) {
    let str = `  create${capitalizedTypeName}(\n`;
  }
};

const getQueryTypeDefFieldsForEntity = (entity, queryType) => {
  const metadata = Reflect.getMetadata('EntityApiDecorator', entity);
  const queryMetadata = metadata[pluralize(queryType)];
  let str = '';
  if (queryMetadata) {
    str += queryMetadata.map(query => getQueryTypeDefField(entity, query)).join('');
  }
  return str;
};

const getQueryTypeDef = (entityArray, queryType) => {
  let str = `type ${capitalize(queryType)} {\n`;
  str += entityArray.map(
    entity => getQueryTypeDefFieldsForEntity(entity, queryType)
  ).join();
  str += '}\n';
  return str;
};

export const getTypeDefs = function (entityArray) {

  const entityTypeDefs = entityArray.map(entity => getEntityTypeDef(entity)).join();
  const queryTypeDef = getQueryTypeDef(entityArray, 'query');
  const mutationTypeDef = getQueryTypeDef(entityArray, 'mutation');

  // currently gql tag is implemented as noop. The reason why I do this is I can 
  // get syntax highlighting using Kumar Harsh's GraphQL for VSCode syntax highlighting extension.
  // If anybody has a better idea, pls let me know.
  const gql = x => x;

  const typeDefs =
    entityTypeDefs +
    queryTypeDef +
    gql`
      type Mutation {
        createUser( 
          firstName: String!, 
          lastName: String!
        ): User
        deleteUser(
          id: Int!
        ): Boolean
        updateUser(
          id: Int!
          firstName: String
          lastName: String
        ): User
      }
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    console.log(typeDefs);
  return typeDefs;
};
