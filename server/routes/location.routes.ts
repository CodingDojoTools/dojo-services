import { locationController } from '@server/controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const locationRouter = Router();

locationRouter
  .get('/', wrapper(locationController.index, locationController))
  .post('/', wrapper(locationController.create, locationController))
  .get('/:location_id', wrapper(locationController.show, locationController))
  .put('/:location_id', wrapper(locationController.update, locationController))
  .delete(
    '/:location_id',
    wrapper(locationController.destroy, locationController)
  );
