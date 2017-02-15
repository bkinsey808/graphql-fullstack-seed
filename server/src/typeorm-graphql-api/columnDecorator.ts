const COLUMN_METADATA_KEY = 'ColumnApiDecorator';

export interface ColumnApiOptions {
  apiName: String;
  apiType: String;
  updatable?: Boolean;
  requiredForCreate?: Boolean;
}

export const ColumnApi = (options: ColumnApiOptions): PropertyDecorator => {
  return function (target: any) {
    Reflect.defineMetadata(COLUMN_METADATA_KEY, options, target);
  };
};
