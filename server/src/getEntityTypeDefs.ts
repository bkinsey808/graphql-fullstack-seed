import { getMetadataArgsStorage } from 'typeorm';
import { AppUser } from './entity/AppUser';

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
  console.log(str);
};

// console.log(Reflect.getMetadata('EntityApiDecorator', AppUser));

const columns = getMetadataArgsStorage().columns
  .filter(column => column.target === AppUser);
// console.log(columns);

export const getEntityTypeDefs = () => {
  const tables = getMetadataArgsStorage().tables.toArray();
};

