import { getMetadataArgsStorage } from 'typeorm';
import { AppUser } from './entity/AppUser';

const columns = getMetadataArgsStorage().columns
  .filter(column => column.target === AppUser);
// console.log(columns);

export const getEntityTypeDefs = () => {
  let str = '';

  const tables = getMetadataArgsStorage().tables.toArray();
  console.log(tables);
  tables.map(table => {
    str += `type ${table.target.constructor.name} {\n`;
  });
  console.log(str);
};

