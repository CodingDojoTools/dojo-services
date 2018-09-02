import {
  Asyncable,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from '../../interfaces';

export function wrapper<T>(
  callback: Asyncable,
  context: T = null
): RequestHandler {
  return (request: Request, response: Response, next: NextFunction): void => {
    callback.call(context, request, response, next).catch(next);
  };
}
