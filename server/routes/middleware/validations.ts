import { Request, Response, NextFunction } from '@server/interfaces';
import { Error as MError } from 'mongoose';
import { Http } from '@status/codes';

export function validationsHandler(
  error: Error | MError.ValidationError,
  _request: Request,
  response: Response,
  next: NextFunction
) {
  if (isValidationError(error)) {
    const errors = Object.keys(error.errors).map(
      key => error.errors[key].message
    );

    return response.status(Http.UnprocessableEntity).json(errors);
  }

  next(error);
}
function isValidationError(error: any): error is MError.ValidationError {
  return Boolean(error.errors);
}
