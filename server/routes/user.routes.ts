import { userController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const userRouter = Router();

userRouter
  .get('/', wrapper(userController.index, userController))
  .post('/', wrapper(userController.create, userController))
  .get('/:user_id', wrapper(userController.show, userController))
  .put('/:user_id', wrapper(userController.update, userController))
  .delete('/:user_id', wrapper(userController.destroy, userController));
