import { stackVariantController } from '../controllers';
import { wrapper } from './middleware';
import { Router } from 'express';

export const stackVariantRouter = Router();

stackVariantRouter
  .get('/', wrapper(stackVariantController.index, stackVariantController))
  .post('/', wrapper(stackVariantController.create, stackVariantController))
  .get(
    '/:location_variant_id',
    wrapper(stackVariantController.show, stackVariantController)
  )
  .put(
    '/:location_variant_id',
    wrapper(stackVariantController.update, stackVariantController)
  )
  .delete(
    '/:location_variant_id',
    wrapper(stackVariantController.destroy, stackVariantController)
  );
