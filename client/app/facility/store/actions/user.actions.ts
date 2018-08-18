import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { User } from '@app/auth/models';

export enum UserActionTypes {
  LoadUsers = '[Facilities] Loading Users',
  LoadUsersSuccess = '[Facilities] Loading Users Success',
  LoadUsersFail = '[Facilities] Loading Users Fail',

  LoadUser = '[Facilities] Loading User',
  LoadUserSuccess = '[Facilities] Loading User Success',
  LoadUserFail = '[Facilities] Loading User Fail',

  UpdateUser = '[Facilities] Updating User',
  UpdateUserSuccess = '[Facilities] Updating User Success',
  UpdateUserFail = '[Facilities] Updating User Fail',

  RemoveUser = '[Facilities] Removing User',
  RemoveUserSuccess = '[Facilities] Removing User Success',
  RemoveUserFail = '[Facilities] Removing User Fail',

  ClearUsers = '[Facilities] Clear Users',
}

export class UsersLoad implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class UsersLoadSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;

  constructor(public readonly payload: User[]) {}
}

export class UsersLoadFail implements Action {
  readonly type = UserActionTypes.LoadUsersFail;

  constructor(public readonly error: any) {}
}

export class UserLoad implements Action {
  readonly type = UserActionTypes.LoadUsers;

  constructor(public readonly payload: string) {}
}

export class UserLoadFail implements Action {
  readonly type = UserActionTypes.LoadUserFail;

  constructor(public readonly error: any) {}
}

export class UserRemove implements Action {
  readonly type = UserActionTypes.RemoveUser;

  constructor(public readonly payload: User) {}
}

export class UserRemoveFail implements Action {
  readonly type = UserActionTypes.RemoveUserFail;

  constructor(public readonly error: any) {}
}

export class UserRemoveSuccess implements Action {
  readonly type = UserActionTypes.RemoveUserSuccess;

  constructor(public readonly payload: User) {}
}

export class UserUpdate implements Action {
  readonly type = UserActionTypes.UpdateUser;

  constructor(public readonly payload: User) {}
}

export class UserUpdateFail implements Action {
  readonly type = UserActionTypes.UpdateUserFail;

  constructor(public readonly error: any) {}
}

export class UserUpdateSuccess implements Action {
  readonly type = UserActionTypes.UpdateUserSuccess;

  constructor(public readonly payload: Update<User>) {}
}

export class UsersClear implements Action {
  readonly type = UserActionTypes.ClearUsers;
}

export type UserActions =
  | UsersClear
  | UsersLoad
  | UsersLoadFail
  | UsersLoadSuccess
  | UserLoad
  | UserLoadFail
  | UserRemove
  | UserRemoveFail
  | UserRemoveSuccess
  | UserUpdate
  | UserUpdateFail
  | UserUpdateSuccess;
