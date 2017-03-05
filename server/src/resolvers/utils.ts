import * as path from 'path';
import * as pgp from 'pg-promise';


export const isPgp = (object: any): object is pgp.IMain => true;

const getFullPath = (file: string) => path.join(__dirname, file);

export const sql = (file: string) =>
  new pgp.QueryFile(getFullPath(file), {
    minify: true
  });

