import { apiController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const apiRoutes = Router();

apiRoutes
  .get('/', wrapper(apiController.show, apiController))
  .post('/', wrapper(apiController.create, apiController));
