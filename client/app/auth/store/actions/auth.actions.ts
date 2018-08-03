import { SocialUser } from 'angularx-social-login';
import { Action } from '@ngrx/store';
import { User } from '@auth/models';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  GoogleLogin = '[Auth] Google Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
}

export class GoogleLogin implements Action {
  readonly type = AuthActionTypes.GoogleLogin;
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: SocialUser) {
    console.log(this);
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
  | GoogleLogin
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
