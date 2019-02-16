import { Router } from 'express';

import { authController } from '@server/controllers';
import { wrapper } from './middleware';

export const authRoutes = Router();

authRoutes
  // for now
  .post(
    '/login/:provider',
    wrapper(authController.googleSignIn, authController)
  )
  .delete('/logout', wrapper(authController.logout, authController))
  .get('/loggedInUser', wrapper(authController.loggedInUser, authController));
