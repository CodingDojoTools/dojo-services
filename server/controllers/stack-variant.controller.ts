import { StackVariantModel, StackVariant } from '@server/models';
import { BaseController } from './base.controller';

class StackVariantController extends BaseController {
  constructor(variant: StackVariantModel) {
    super(variant);
  }
}

export const stackVariantController = new StackVariantController(StackVariant);
