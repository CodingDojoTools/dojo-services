import { examController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const examRoutes = Router();

examRoutes
  .get('/', wrapper(examController.index, examController))
  .post('/', wrapper(examController.create, examController))
  .get('/:exam_id', wrapper(examController.show, examController))
  .put('/:exam_id', wrapper(examController.update, examController))
  .delete('/:exam_id', wrapper(examController.destroy, examController));
