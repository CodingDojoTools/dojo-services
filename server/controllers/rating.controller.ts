import { BaseController } from './base.controller';
import { RatingModel, Rating } from '@server/models';

class RatingController extends BaseController {
  constructor(model: RatingModel) {
    super(model);
  }
}

export const ratingController = new RatingController(Rating);
