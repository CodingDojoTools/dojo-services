import { Router } from 'express';

import { API } from '@server/config';
import { authRouter } from './auth.routes';
import { examRouter } from './exam.routes';
import { fingerprintRouter } from './fingerprint.routes';
import { ignoreRouter } from './ignore.routes';
import { locationRouter } from './location.routes';
import { ratingRouter } from './rating.routes';
import { similarityAssessmentRouter } from './similarity-assessment-routes';
import { stackVariantRouter } from './stack-variant.routes';
import { stackRouter } from './stack.routes';
import { studentRouter } from './student.routes';
import { submissionFileRouter } from './submission-file.routes';
import { submissionRouter } from './submission.routes';
import { userRouter } from './user.routes';
import { catchallRouter } from './catch-all.route';

import { routeLogger, tokenAuth } from './middleware';

export const routes = Router();
const api = Router();

api
  .use(tokenAuth)
  .use('/auth', authRouter)
  .use('/exams', examRouter)
  .use('/fingerprints', fingerprintRouter)
  .use('/ignores', ignoreRouter)
  .use('/locations', locationRouter)
  .use('/ratings', ratingRouter)
  .use('/similarity_assessments', similarityAssessmentRouter)
  .use('/stack_variants', stackVariantRouter)
  .use('/stacks', stackRouter)
  .use('/students', studentRouter)
  .use('/submission_files', submissionFileRouter)
  .use('/submissionRouter', submissionRouter)
  .use('/users', userRouter);

// append all routes to api and catch all failed routings
routes
  .use(routeLogger)
  .use(API, api)
  .use(catchallRouter);
