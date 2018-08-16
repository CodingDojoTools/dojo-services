import { Identity, User, IUser, IIdentity } from '../models';
import { Request, Response } from 'express';
import { SocialUser, UserIP, TokenPayload } from '../interfaces';
import { GoogleAuthHelper, AuthHelper, getIP, debug } from '../utils';

class AuthController {
  async googleSignIn(request: Request, response: Response): Promise<any> {
    const { body: userData }: { body: SocialUser } = request;

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
     * create token
     */

    response.json({ user, isNew: user.isNew });
  }

  logout() {
    // invalidate token
  }
}

/**
 * meh..
 *
 * @class CreateUpdateUserHelper
 */
class CreateUpdateUserHelper {
  private readonly identity = Identity;
  private readonly user = User;
  constructor(
    private readonly provider: GoogleAuthHelper,
    private readonly userData: UserIP
  ) {}

  async getUser(): Promise<IUser> {
    const [identity, user] = await this.populate();

    if (user && identity) {
      return await this.updateUser(user, this.userData.lastIpAddress);
    }
    return await this.createUserAndIdentity();
  }

  private async populate(): Promise<[IIdentity, IUser]> {
    return await Promise.all([
      this.findIdentity(this.provider.provider, this.provider.payload.sub),
      this.findUser(this.userData.email || this.provider.payload.email),
    ]);
  }

  private async findIdentity(provider: string, providerId: string) {
    return await this.identity.findOne({ provider, providerId });
  }

  private async findUser(email: string) {
    return await this.user.findOne({ email }).lean();
  }

  private async createUserAndIdentity(): Promise<IUser> {
    const user = await this.createUser(this.userData);
    await this.createIdentity(this.provider.payload, user.id);
    return user;
  }

  private async createUser(userData: SocialUser): Promise<IUser> {
    return await this.user.create({ ...userData, lastSignIn: Date.now() });
  }

  private async createIdentity(
    payload: TokenPayload,
    user: string
  ): Promise<IIdentity> {
    return await this.identity.create({
      ...payload,
      user,
      provider: this.provider.provider,
      providerId: payload.sub,
    });
  }

  private async updateUser(user: IUser, lastIpAddress: string): Promise<IUser> {
    return await this.user.findByIdAndUpdate(
      user._id,
      { $set: { lastIpAddress, lastSignIn: Date.now() } },
      { new: true }
    );
  }
}

export const authController = new AuthController();
