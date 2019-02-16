import { stackController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const stackRoutes = Router();

stackRoutes
  .get('/', wrapper(stackController.index, stackController))
  .post('/', wrapper(stackController.create, stackController))
  .get('/:stack_id', wrapper(stackController.show, stackController))
  .put('/:stack_id', wrapper(stackController.update, stackController))
  .delete('/:stack_id', wrapper(stackController.destroy, stackController));
