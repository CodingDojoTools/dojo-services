export abstract class BaseError extends Error {
  abstract readonly code: number;
}

export class UnAuthorizedError extends BaseError {
  readonly code = 401;
}

export class TokenError extends UnAuthorizedError {
  message = 'The token is invalid or expired';
}

export class BadRequestError extends BaseError {
  readonly code = 400;
}
