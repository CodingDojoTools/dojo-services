import { BaseController } from './base.controller';
import { SubmissionFileModel, SubmissionFile } from '@server/models';

class SubmissionFileController extends BaseController {
  constructor(model: SubmissionFileModel) {
    super(model);
  }
}

export const submissionFileController = new SubmissionFileController(
  SubmissionFile
);
