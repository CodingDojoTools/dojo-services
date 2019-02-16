import { similarityAssessmentController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const similarityAssessmentRoutes = Router();

similarityAssessmentRoutes
  .get(
    '/',
    wrapper(
      similarityAssessmentController.index,
      similarityAssessmentController
    )
  )
  .post(
    '/',
    wrapper(
      similarityAssessmentController.create,
      similarityAssessmentController
    )
  )
  .get(
    '/:similarity_assessment_id',
    wrapper(similarityAssessmentController.show, similarityAssessmentController)
  )
  .put(
    '/:similarity_assessment_id',
    wrapper(
      similarityAssessmentController.update,
      similarityAssessmentController
    )
  )
  .delete(
    '/:similarity_assessment_id',
    wrapper(
      similarityAssessmentController.destroy,
      similarityAssessmentController
    )
  );
