import * as jwt from 'jsonwebtoken';

import { ServerError, TokenError } from './errors';

export function verifyToken(
  token: string,
  secret: string
): Promise<string | object> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return reject(new TokenError(error.message));
      }
      resolve(decoded);
    });
  });
}

export function signToken(
  payload: string | object,
  secret: string,
  options: jwt.SignOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (error, encoded) => {
      if (error) {
        return reject(new ServerError(error.message));
      }

      resolve(encoded);
    });
  });
}
