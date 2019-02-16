import { studentController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const studentRoutes = Router();

studentRoutes
  .get('/', wrapper(studentController.index, studentController))
  .post('/', wrapper(studentController.create, studentController))
  .get('/:student_id', wrapper(studentController.show, studentController))
  .put('/:student_id', wrapper(studentController.update, studentController))
  .delete(
    '/:student_id',
    wrapper(studentController.destroy, studentController)
  );
