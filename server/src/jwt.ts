  import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';


if (process.cwd().endsWith('/server')) {
  process.chdir('../');
}
const privateKey = readFileSync('./key/jwt.rsa').toString();

const jwtSignOptions: jwt.SignOptions = {
  expiresIn: 120,
  algorithm: 'RS256',
};

export const createToken =
  payload => 
    jwt.sign(payload, privateKey, jwtSignOptions);
