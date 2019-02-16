import { GoogleAuthHelper, AuthHelper, debug, getIP } from '@server/utils';
import { SocialUser, Request, Response } from '@server/interfaces';
import { CreateUpdateUserHelper } from './helpers';
import {
  User,
  IUser,
  UserModel,
  AuthToken,
  AuthTokenModel,
  AuthTokenDocument,
} from '@server/models';

class AuthController {
  constructor(
    private readonly model: UserModel,
    private readonly auth: AuthTokenModel
  ) {}

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

    const token = await this.createToken(user, request.app.get('token_secret'));

    this.setToken(response, token.token);

    response.json({ user, isNew: user.isNew, token: token.token });
  }

  async logout(request: Request, response: Response) {
    const { token } = request;

    await this.auth.revoke(token.token);

    response.json(token);
  }

  async loggedInUser(request: Request, response: Response) {
    const user = await this.model.findById(request.token._id).lean();

    response.json(user);
  }

  private setToken(response: Response, token: string): void {
    response.set('authorization', `Bearer ${token}`);
  }

  private async createToken(
    user: IUser,
    secret: string
  ): Promise<AuthTokenDocument> {
    // await this.auth
    /**
     * @todo
     * attach user roles/permissions
     */

    return await this.auth.generate(user._id, secret);
  }
}

export const authController = new AuthController(User, AuthToken);
