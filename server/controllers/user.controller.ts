import { Request, Response } from '@server/interfaces';
import { BaseController } from './base.controller';
import { UnAuthorizedError } from '@server/utils';
import { UserModel, User } from '@server/models';

class UserController extends BaseController {
  constructor(user: UserModel) {
    super(user);
  }

  async create(
    _request: Request,
    _response: Response
  ): Promise<UnAuthorizedError> {
    throw new UnAuthorizedError('Unable to create user in this fashion');
  }
}

export const userController = new UserController(User);
