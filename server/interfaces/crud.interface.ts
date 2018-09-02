import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNext,
  RequestHandler as ExpressRequestHandler,
} from 'express';

export interface CRUD {
  index: RequestHandler;
  show: RequestHandler;
  create: RequestHandler;
  destroy: RequestHandler;
  update: RequestHandler;
}

export type Asyncable = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<any>;

export interface Request extends ExpressRequest {
  token: any;
}

/* tslint:disable-next-line:no-empty-interface */
export interface Response extends ExpressResponse {}

/* tslint:disable-next-line:no-empty-interface */
export interface NextFunction extends ExpressNext {}

/* tslint:disable-next-line:no-empty-interface */
export interface RequestHandler extends ExpressRequestHandler {}
