import { SocialUser } from 'angularx-social-login';
import { Action } from '@ngrx/store';
import { User, LoggedUser } from '@auth/models';

export enum AuthActionTypes {
  AuthInit = '[Auth] Init',
  Login = '[Auth] Login',
  GoogleLogin = '[Auth] Google Login',
  GoogleLogout = '[Auth] Google Logout',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFailure = '[Auth] Logout Failure',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  CurrentUser = '[Auth] Retrieve Current User',
  CurrentUserSuccess = '[Auth] Retrieve Current User Success',
  CurrentUserFailure = '[Auth] Retrieve Current User Failure',
}

export class AuthInit implements Action {
  readonly type = AuthActionTypes.AuthInit;
}

export class GoogleLogin implements Action {
  readonly type = AuthActionTypes.GoogleLogin;
}

export class GoogleLogout implements Action {
  readonly type = AuthActionTypes.GoogleLogout;
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: SocialUser) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: LoggedUser) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;

  constructor(public readonly payload = '/') {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}
export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;

  constructor(public readonly payload: User) {}
}
export class LogoutFailure implements Action {
  readonly type = AuthActionTypes.LogoutFailure;

  constructor(public readonly payload: any) {}
}

export class CurrentUser implements Action {
  readonly type = AuthActionTypes.CurrentUser;
}

export class CurrentUserSuccess implements Action {
  readonly type = AuthActionTypes.CurrentUserSuccess;

  constructor(public readonly payload: { user: User }) {}
}

export class CurrentUserFailure implements Action {
  readonly type = AuthActionTypes.CurrentUserFailure;

  constructor(public payload: any) {}
}

export type AuthActions =
  | AuthInit
  | GoogleLogin
  | GoogleLogout
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | CurrentUser
  | CurrentUserSuccess
  | CurrentUserFailure;
