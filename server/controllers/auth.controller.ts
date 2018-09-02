import { SocialUser, Request, Response } from '../interfaces';
import { CreateUpdateUserHelper } from './helpers';
import { IUser, UserModel, User } from '../models';
import { tokenOptions } from '../config';

import {
  GoogleAuthHelper,
  AuthHelper,
  debug,
  getIP,
  signToken,
} from '../utils';

class AuthController {
  constructor(private readonly model: UserModel) {}

  async googleSignIn(request: Request, response: Response): Promise<any> {
    const { body: userData }: { body: SocialUser } = request;

    debug(
      `Logging in Google Account for ${userData.firstName} ${
        userData.lastName
      } with ${userData.email}`
    );

    const google: GoogleAuthHelper = await AuthHelper.for(
      'google',
      userData
    ).verify();
    const lastIpAddress = getIP(request);
    const user = await new CreateUpdateUserHelper(google, {
      ...userData,
      lastIpAddress,
    }).getUser();

    /**
     * @todo
     * setup session
     */

    debug(
      `Successfully logged in ${user.firstName}. First visit? ${user.isNew}`
    );

    this.setToken(
      response,
      await signToken(
        this.createTokenPayload(user),
        request.app.get('token_secret'),
        tokenOptions
      )
    );

    response.json({ user, isNew: user.isNew });
  }

  async logout(request: Request, response: Response) {
    this.setToken(
      response,
      await signToken(
        {
          _id: request.token._id,
        },
        request.app.get('token_secret'),
        {
          expiresIn: 1,
        }
      )
    );

    response.json(request.user);
  }

  async loggedInUser(request: Request, response: Response) {
    const user = await this.model.findById(request.token._id).lean();

    response.json(user);
  }

  private setToken(response: Response, token: string): void {
    response.set('authorization', `Bearer ${token}`);
  }

  private createTokenPayload(user: IUser) {
    /**
     * @todo
     * attach user roles/permissions
     */

    return { _id: user._id };
  }
}

export const authController = new AuthController(User);
