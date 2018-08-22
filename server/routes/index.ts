import { Router } from 'express';

import { API } from '../../shared';
import { authRouter } from './auth.routes';
import { locationRouter } from './location.routes';
import { stackRouter } from './stack.routes';
import { stackVariantRouter } from './stack-variant.routes';
import { userRouter } from './user.routes';
import { catchallRouter } from './catch-all.route';

import { routeLogger, tokenAuth } from './middleware';

export const routes = Router();
const api = Router();

api
  .use('/auth', authRouter)
  .use(tokenAuth)
  .use('/locations', locationRouter)
  .use('/stacks', stackRouter)
  .use('/stack_variants', stackVariantRouter)
  .use('/users', userRouter);

// append all routes to api and catch all failed routings
routes
  .use(routeLogger)
  .use(API, api)
  .use(catchallRouter);
