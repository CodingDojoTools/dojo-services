import { ignoreController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const ignoreRoutes = Router();

ignoreRoutes
  .get('/', wrapper(ignoreController.index, ignoreController))
  .post('/', wrapper(ignoreController.create, ignoreController))
  .get('/:ignore_id', wrapper(ignoreController.show, ignoreController))
  .put('/:ignore_id', wrapper(ignoreController.update, ignoreController))
  .delete('/:ignore_id', wrapper(ignoreController.destroy, ignoreController));
