import { resolve } from 'path';
import { Router } from 'express';

export const catchallRouter = Router();

catchallRouter.all('*', (_request, response) => {
  response.sendFile(resolve('dist', 'public', 'index.html'));
});
