import { beltController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const beltRoutes = Router();

beltRoutes
  .get('/', wrapper(beltController.index, beltController))
  .post('/', wrapper(beltController.create, beltController))
  .get('/:belt_id', wrapper(beltController.show, beltController))
  .put('/:belt_id', wrapper(beltController.update, beltController))
  .delete('/:belt_id', wrapper(beltController.destroy, beltController));
