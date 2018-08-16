import { locationVariantController } from '../controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const locationVariantRouter = Router();

locationVariantRouter
  .get('/', wrapper(locationVariantController.index, locationVariantController))
  .post(
    '/',
    wrapper(locationVariantController.create, locationVariantController)
  )
  .get(
    '/:location_variant_id',
    wrapper(locationVariantController.show, locationVariantController)
  )
  .put(
    '/:location_variant_id',
    wrapper(locationVariantController.update, locationVariantController)
  )
  .delete(
    '/:location_variant_id',
    wrapper(locationVariantController.destroy, locationVariantController)
  );
