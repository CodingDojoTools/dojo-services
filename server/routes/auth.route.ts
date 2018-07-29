import { Router } from 'express';

import { authController } from '../controllers';
import { wrapper } from './middleware';

export const authRouter = Router();

authRouter
  // for now
  .post(
    '/login/:provider',
    wrapper(authController.googleSignIn, authController)
  );
