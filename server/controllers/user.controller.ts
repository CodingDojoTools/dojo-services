import { Request, Response } from 'express';

import { BaseController } from './base.controller';
import { UserModel, User } from '../models';

class UserController extends BaseController {
  constructor(user: UserModel) {
    super(user);
  }

  create(_request: Request, _response: Response): never {
    throw new Error('Unable to create user in this fashion');
  }
}

export const userController = new UserController(User);
