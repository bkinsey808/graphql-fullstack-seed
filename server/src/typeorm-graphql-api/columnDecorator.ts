import 'reflect-metadata';
import * as capitalize from 'capitalize';
import { getMetadataArgsStorage } from '../lib/typeorm';


const COLUMN_METADATA_KEY = 'ColumnApiDecorator';

export interface ColumnApiOptions {
  apiName: String;
  apiType: String;
  apiDescription?: String;
  updatable?: Boolean;
  requiredForCreate?: Boolean;
}

export const ColumnApi = (options: ColumnApiOptions): PropertyDecorator =>
  (target, property: string) => {
    const classConstructor = target.constructor;
    const metadata = Reflect.getMetadata(COLUMN_METADATA_KEY, classConstructor) || {};
    metadata[property] = options;
    Reflect.defineMetadata(COLUMN_METADATA_KEY, metadata, classConstructor);
  };

const getColumnMetadata = (entity, columnName) => {
  const metadata = Reflect.getMetadata(COLUMN_METADATA_KEY, entity) || {};
  return metadata[columnName];
};

// get an array of all of the columns' metadata
export const getColumnsMetadata = entity =>
    // get the columns from typeorm
    getMetadataArgsStorage().columns.toArray()
    // filter to only the columns in this entity
    .filter(column => column.target === entity)
    // from the columns get the property names
    .map(column => column.propertyName)
    // get the metadata from ColumnDecorator
    .map(propertyName => getColumnMetadata(entity, propertyName));
