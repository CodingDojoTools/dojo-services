import { stackController } from '../controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const stackRouter = Router();

stackRouter
  .get('/', wrapper(stackController.index, stackController))
  .post('/', wrapper(stackController.create, stackController))
  .get('/:stack_id', wrapper(stackController.show, stackController))
  .put('/:stack_id', wrapper(stackController.update, stackController))
  .delete('/:stack_id', wrapper(stackController.destroy, stackController));
