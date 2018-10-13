import { submissionFileController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const submissionFileRouter = Router();

submissionFileRouter
  .get('/', wrapper(submissionFileController.index, submissionFileController))
  .post('/', wrapper(submissionFileController.create, submissionFileController))
  .get(
    '/:submission_file_id',
    wrapper(submissionFileController.show, submissionFileController)
  )
  .put(
    '/:submission_file_id',
    wrapper(submissionFileController.update, submissionFileController)
  )
  .delete(
    '/:submission_file_id',
    wrapper(submissionFileController.destroy, submissionFileController)
  );
