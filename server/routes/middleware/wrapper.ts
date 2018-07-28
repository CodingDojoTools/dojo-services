import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Asyncable } from '../../interfaces';

export function wrapper<T>(
  callback: Asyncable,
  context: T = null
): RequestHandler {
  return (request: Request, response: Response, next: NextFunction): void => {
    callback.call(context, request, response, next).catch(next);
  };
}
