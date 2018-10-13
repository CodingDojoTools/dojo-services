import { fingerprintController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const fingerprintRouter = Router();

fingerprintRouter
  .get('/', wrapper(fingerprintController.index, fingerprintController))
  .post('/', wrapper(fingerprintController.create, fingerprintController))
  .get(
    '/:fingerprint_id',
    wrapper(fingerprintController.show, fingerprintController)
  )
  .put(
    '/:fingerprint_id',
    wrapper(fingerprintController.update, fingerprintController)
  )
  .delete(
    '/:fingerprint_id',
    wrapper(fingerprintController.destroy, fingerprintController)
  );
