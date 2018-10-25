import { BaseController } from './base.controller';
import { BeltModel, Belt } from '@server/models';

class BeltController extends BaseController {
  constructor(model: BeltModel) {
    super(model);
  }
}

export const beltController = new BeltController(Belt);
