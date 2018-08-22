import { BaseController } from './base.controller';
import { LocationModel, Location, User } from '../models';

class LocationController extends BaseController {
  constructor(location: LocationModel) {
    super(location);
  }
}

export const locationController = new LocationController(Location);
