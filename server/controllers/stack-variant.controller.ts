import { BaseController } from './base.controller';
import { StackVariantModel, StackVariant } from '../models';

class StackVariantController extends BaseController {
  constructor(variant: StackVariantModel) {
    super(variant);
  }
}

export const stackVariantController = new StackVariantController(StackVariant);
