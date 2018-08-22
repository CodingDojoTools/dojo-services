import { Request, Response, NextFunction } from 'express';
import { TokenError, verifyToken } from '../../utils';
import { jwtOptions } from '../../config';

import * as jwt from 'express-jwt';

export function tokenVerify(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const { token }: { token: string } = request as any;

  verifyToken(token, request.app.get('token_secret'))
    .then(() => next())
    .catch(error => {
      next(new TokenError(error.message));
    });
}

export const tokenAuth = jwt(jwtOptions);
