import { BaseController } from './base.controller';
import { LocationVariantModel, LocationVariant } from '../models';

class LocationVariantController extends BaseController {
  constructor(variant: LocationVariantModel) {
    super(variant);
  }
}

export const locationVariantController = new LocationVariantController(
  LocationVariant
);
