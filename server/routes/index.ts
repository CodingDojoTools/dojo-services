import { Router } from 'express';

import { API } from '../../shared';
import { authRouter } from './auth.route';
import { catchallRouter } from './catch-all.route';

export const routes = Router();
const api = Router();

api.use('/auth', authRouter);

//
routes.use(API, api).use(catchallRouter);
