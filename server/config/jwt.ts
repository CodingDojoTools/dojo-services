import { Options } from 'express-jwt';
import { PRODUCTION } from './production';
import { isUndefined } from '../utils';
import { SignOptions } from 'jsonwebtoken';

const devSecret = 'dev-token-secret';

export const TOKEN_SECRET = process.env.TOKEN_SECRET || devSecret;

if (PRODUCTION && (isUndefined(TOKEN_SECRET) || TOKEN_SECRET === devSecret)) {
  throw new Error(`Invalid Token Secret used in Production!`);
}

export const jwtOptions: Options = {
  secret: TOKEN_SECRET,
  requestProperty: 'token',
};
/**
 *  algorithm?: string;
    keyid?: string;
    expiresIn?: string | number;
    notBefore?: string | number;
    audience?: string | string[];
    subject?: string;
    issuer?: string;
    jwtid?: string;
    noTimestamp?: boolean;
    header?: object;
    encoding?: string;
*/
export const tokenOptions: SignOptions = {
  algorithm: 'HS512',
  expiresIn: PRODUCTION ? '2 days' : '1 week',
};
