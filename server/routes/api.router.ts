import { topicRoutes } from './topic.routes';
import { apikey } from './middleware';
import { Router } from 'express';

export const apiRouter = Router();

apiRouter.use('/topics', [apikey], topicRoutes);
