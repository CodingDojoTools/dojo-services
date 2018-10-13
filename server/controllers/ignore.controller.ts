import { BaseController } from './base.controller';
import { IgnoreModel, Ignore } from '@server/models';

class IgnoreController extends BaseController {
  constructor(model: IgnoreModel) {
    super(model);
  }
}

export const ignoreController = new IgnoreController(Ignore);
