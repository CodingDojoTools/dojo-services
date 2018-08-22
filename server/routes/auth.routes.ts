import { Router } from 'express';

import { authController } from '../controllers';
import { tokenAuth, wrapper } from './middleware';

export const authRouter = Router();

authRouter
  // for now
  .post(
    '/login/:provider',
    wrapper(authController.googleSignIn, authController)
  )
  .use(tokenAuth)
  .delete('/logout', wrapper(authController.logout, authController))
  .get('/loggedInUser', wrapper(authController.loggedInUser, authController));
