import { submissionController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const submissionRouter = Router();

submissionRouter
  .get('/', wrapper(submissionController.index, submissionController))
  .post('/', wrapper(submissionController.create, submissionController))
  .get(
    '/:submission_id',
    wrapper(submissionController.show, submissionController)
  )
  .put(
    '/:submission_id',
    wrapper(submissionController.update, submissionController)
  )
  .delete(
    '/:submission_id',
    wrapper(submissionController.destroy, submissionController)
  );
