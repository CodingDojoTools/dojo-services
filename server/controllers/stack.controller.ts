import { BaseController } from './base.controller';
import { StackModel, Stack } from '@server/models';

class StackController extends BaseController {
  constructor(stack: StackModel) {
    super(stack);
  }
}

export const stackController = new StackController(Stack);
