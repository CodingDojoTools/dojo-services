import { UserIP, SocialUser, TokenPayload } from '../../interfaces';
import { IUser, Identity, IIdentity, User } from '../../models';
import { GoogleAuthHelper } from '../../utils';

/**
 * meh..
 *
 * @class CreateUpdateUserHelper
 */
export class CreateUpdateUserHelper {
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
    await this.createIdentity(this.provider.payload, user._id);
    return user;
  }

  private async createUser(userData: SocialUser): Promise<IUser> {
    const user = await this.user.create(userData);

    return { ...user.toObject(), isNew: true };
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
