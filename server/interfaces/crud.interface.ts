import { Request, Response, NextFunction, RequestHandler } from 'express';

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
