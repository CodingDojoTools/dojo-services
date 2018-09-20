import { Request, Response } from 'express';

import { BaseController } from './base.controller';
import { UnAuthorizedError } from '@server/utils';
import { UserModel, User } from '@server/models';

class UserController extends BaseController {
  constructor(user: UserModel) {
    super(user);
  }

  async create(_request: Request, _response: Response): Promise<never> {
    throw new UnAuthorizedError('Unable to create user in this fashion');
  }
}

export const userController = new UserController(User);
