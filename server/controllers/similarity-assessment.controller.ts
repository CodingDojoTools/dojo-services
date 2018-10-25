import { BaseController } from './base.controller';
import {
  SimilarityAssessmentModel,
  SimilarityAssessment,
} from '@server/models';

class SimilarityAssessmentController extends BaseController {
  constructor(model: SimilarityAssessmentModel) {
    super(model);
  }
}

export const similarityAssessmentController = new SimilarityAssessmentController(
  SimilarityAssessment
);
