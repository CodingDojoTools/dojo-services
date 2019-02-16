import {
  CodedError,
  Request,
  Response,
  NextFunction,
} from '@server/interfaces';
import { Http } from '@status/codes';

export function basicErrorHandler(
  error: CodedError,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const message = error.message
    ? error.message
    : 'Something went wrong, try again';
  const code = error.code || Http.InternalServerError;

  response.status(code).json(message);
}
