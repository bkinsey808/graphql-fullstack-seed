import { getMetadataArgsStorage } from 'typeorm';


export function EntityApi(options: Object) {
  return function (target: Function) {
    Reflect.defineMetadata('EntityApiDecorator', options, target);
  };
}

// clearly this is not the complete implementation!
const typeOrmType2graphqlType =
  typeOrmType => typeOrmType.charAt(0).toUpperCase() + typeOrmType.slice(1);

export const getTypeDef = entityClass => {
  const metadata = Reflect.getMetadata('EntityApiDecorator', entityClass);
  const columns = getMetadataArgsStorage().columns.toArray()
    .filter(column => column.target === entityClass);
  let str = `type ${metadata.typeName} {\n`;
  columns.map(column => {
    const graphqlType = typeOrmType2graphqlType(column.options.type);
    str += `  ${column.propertyName}: ${graphqlType}\n`;
  });
  str += '}\n';
  return str;
};

export const getTypeDefs = function (entityArray) {
  // currently gql tag is implemented as noop. The reason why I do this is I can 
  // get syntax highlighting using Kumar Harsh's GraphQL for VSCode syntax highlighting extension.
  // If anybody has a better idea, pls let me know.
  const gql = x => x;

  const typeDefs =
    entityArray.map(entity => getTypeDef(entity)).join() +
    gql`
      type Query {
        users: [User]
        user(id: Int): User
      }
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
  return typeDefs;
};
