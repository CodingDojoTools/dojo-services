import { ratingController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const ratingRouter = Router();

ratingRouter
  .get('/', wrapper(ratingController.index, ratingController))
  .post('/', wrapper(ratingController.create, ratingController))
  .get('/:rating_id', wrapper(ratingController.show, ratingController))
  .put('/:rating_id', wrapper(ratingController.update, ratingController))
  .delete('/:rating_id', wrapper(ratingController.destroy, ratingController));
