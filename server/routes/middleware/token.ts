import { Request, Response, NextFunction } from '@server/interfaces';
import { TokenError, verifyToken } from '@server/utils';
import { API, jwtOptions } from '@server/config';
import { AuthToken } from '@server/models';

import * as jwt from 'express-jwt';

const providers = new RegExp(`${API}/auth/login/*`, 'i');

export function tokenVerify(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const { token }: { token: string } = request;

  verifyToken(token, request.app.get('token_secret'))
    .then(() => next())
    .catch(error => {
      next(new TokenError(error.message));
    });
}

function isRevoked(
  _request: Request,
  payload: any,
  done: (error: Error, revoked?: boolean) => void
) {
  const { token: id }: { token: string } = payload;

  AuthToken.findById(id)
    .then(token => done(null, token.revoked))
    .catch(done);
}

export const tokenAuth = jwt({ ...jwtOptions, isRevoked }).unless({
  path: [providers],
});

export function tokenErrorHandler(
  error: Error,
  _request: Request,
  _response: Response,
  next: NextFunction
): void {
  if (error.name === 'UnauthorizedError') {
    return next(new TokenError());
  }

  next(error);
}
