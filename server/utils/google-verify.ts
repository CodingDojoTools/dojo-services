import { OAuth2Client } from 'google-auth-library';

import { TokenPayload, Google } from '@server/interfaces';
import { TokenError, UnAuthorizedError } from './errors';
import { PRODUCTION } from '@server/config';
import { not } from './helpers';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const emailReg = new RegExp('[a-z]*@codingdojo.com', 'i');

export abstract class AuthHelper {
  abstract provider: string;
  abstract payload: any;

  constructor(public readonly token) {}

  static for(provider: 'google', options: Google): GoogleAuthHelper;
  static for(provider: string, options: any) {
    switch (provider) {
      case 'google': {
        return new GoogleAuthHelper(options);
      }
    }
  }

  abstract async verify(token: string): Promise<any>;
}

export class GoogleAuthHelper extends AuthHelper {
  private readonly client: OAuth2Client;
  readonly provider = 'google';
  payload: TokenPayload;

  constructor({ idToken: token }: Google) {
    super(token);
    this.client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
  }

  async verify(): Promise<GoogleAuthHelper> {
    const ticket = await this.client
      .verifyIdToken({
        idToken: this.token,
        audience: CLIENT_ID,
      })
      .catch(() => {
        throw new TokenError();
      });

    this.payload = ticket.getPayload();

    if (this.notOrgMember(this.payload.hd)) {
      throw new UnAuthorizedError('Log in with your Coding Dojo account');
    }

    return this;
  }

  private notOrgMember(domain: string) {
    return PRODUCTION && (not(domain) || not(emailReg.test(domain)));
  }
}
