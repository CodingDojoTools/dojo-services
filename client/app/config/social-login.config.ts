import {
  AuthServiceConfig,
  GoogleLoginProvider,
  LoginOpt,
} from 'angularx-social-login';

const loginOptions: LoginOpt = {
  scope: 'profile email openid',
};

export function getAuthServiceConfigs(): AuthServiceConfig {
  return new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '907482379813-msv7cai8j21k33itcf0ufmg089f1ckbj.apps.googleusercontent.com',
        loginOptions
      ),
    },
  ]);
}
