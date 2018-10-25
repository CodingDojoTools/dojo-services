import { BaseController } from './base.controller';
import { SubmissionModel, Submission } from '@server/models';

class SubmissionController extends BaseController {
  constructor(model: SubmissionModel) {
    super(model);
  }
}

export const submissionController = new SubmissionController(Submission);
