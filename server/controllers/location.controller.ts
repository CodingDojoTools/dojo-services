import { LocationModel, Location } from '@server/models';
import { BaseController } from './base.controller';

class LocationController extends BaseController {
  constructor(location: LocationModel) {
    super(location);
  }
}

export const locationController = new LocationController(Location);
