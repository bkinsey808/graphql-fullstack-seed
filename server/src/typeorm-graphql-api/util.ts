import { getColumnsMetadata } from './columnDecorator';


export const getField = (metadata, isRequired) =>
  (metadata.apiDescription ? `# ${metadata.apiDescription}\n` : '') +
  `  ${metadata.apiName}: ${metadata.apiType}${isRequired ? '!' : ''}\n`;

export const getIdField = entity => {
  const idColumnMetadata = getColumnsMetadata(entity)
    .filter(columnMetadata => columnMetadata.apiName === 'id')[0];
  return getField(idColumnMetadata, true);
};

const getUpdatableColumnsMetadata = entity =>
  getColumnsMetadata(entity)
    // only get the columns that are updatable
    .filter(columnMetadata => columnMetadata.updatable === true);

export const getUpdatableFields = entity =>
  getUpdatableColumnsMetadata(entity)
    .reduce((prev, curr) =>
      prev += getField(curr, false), '');

export const getCreateFields = entity =>
  getUpdatableColumnsMetadata(entity)
    .reduce((prev, curr) =>
      prev += getField(curr, curr.requiredForCreate), '');

export const pairsToObject = (pairs) => {
  return pairs.reduce((prev, curr) => {
    prev[curr[0]] = curr[1];
    return prev;
  }, {});
};
