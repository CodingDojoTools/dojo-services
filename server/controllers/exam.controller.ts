import { BaseController } from './base.controller';
import { ExamModel, Exam } from '@server/models';

class ExamController extends BaseController {
  constructor(model: ExamModel) {
    super(model);
  }
}

export const examController = new ExamController(Exam);
