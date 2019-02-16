import { topicController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const topicRoutes = Router();

topicRoutes.put('/', wrapper(topicController.update, topicController));
