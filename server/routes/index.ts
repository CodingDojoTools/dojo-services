import { Router } from 'express';

import { API } from '@server/config';
import { apiRoutes } from './api.routes';
import { apiRouter } from './api.router';
import { authRoutes } from './auth.routes';
import { examRoutes } from './exam.routes';
import { fingerprintRoutes } from './fingerprint.routes';
import { ignoreRoutes } from './ignore.routes';
import { locationRoutes } from './location.routes';
import { ratingRoutes } from './rating.routes';
import { similarityAssessmentRoutes } from './similarity-assessment-routes';
import { stackVariantRoutes } from './stack-variant.routes';
import { stackRoutes } from './stack.routes';
import { studentRoutes } from './student.routes';
import { submissionFileRoutes } from './submission-file.routes';
import { submissionRoutes } from './submission.routes';
import { userRoutes } from './user.routes';
import { catchallRouter } from './catch-all.route';

import {
  routeLogger,
  tokenAuth,
  tokenErrorHandler,
  basicErrorHandler,
  validationsHandler,
} from './middleware';

export const routes = Router();
const api = Router();

api
  .use(apiRouter)
  .use(tokenAuth)
  .use('/apis', apiRoutes)
  .use('/auth', authRoutes)
  .use('/exams', examRoutes)
  .use('/fingerprints', fingerprintRoutes)
  .use('/ignores', ignoreRoutes)
  .use('/locations', locationRoutes)
  .use('/ratings', ratingRoutes)
  .use('/similarity_assessments', similarityAssessmentRoutes)
  .use('/stack_variants', stackVariantRoutes)
  .use('/stacks', stackRoutes)
  .use('/students', studentRoutes)
  .use('/submission_files', submissionFileRoutes)
  .use('/submissionRoutes', submissionRoutes)
  .use('/users', userRoutes)
  .use([tokenErrorHandler, validationsHandler, basicErrorHandler]);

// append all routes to api and catch all failed routings
routes
  .use(routeLogger)
  .use(API, api)
  .use(catchallRouter);
