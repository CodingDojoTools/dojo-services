import { CodedError } from '@server/interfaces';
import { Http } from '@status/codes';

export abstract class BaseError extends Error implements CodedError {
  abstract readonly code: number;
}

export class UnAuthorizedError extends BaseError {
  message = `You are not authorized to access this resource.
    Contact the adminstrator for more information`;
  readonly code = Http.Unauthorized;
}

export class TokenError extends UnAuthorizedError {
  message = 'The token is invalid or expired';
}

export class BadRequestError extends BaseError {
  readonly code = Http.BadRequest;
}

export class ServerError extends BaseError {
  readonly code = Http.InternalServerError;
}

export class NotFoundError extends BaseError {
  readonly code = Http.NotFound;
}
