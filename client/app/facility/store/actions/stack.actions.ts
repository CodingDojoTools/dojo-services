import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { Stack } from '@facility/models';

export enum StackActionTypes {
  LoadStacks = '[Facilities] Load Stacks',
  LoadStacksFail = '[Facilities] Load Stacks Fail',
  LoadStacksSuccess = '[Facilities] Load Stacks Success',

  CreateStack = '[Facilities] Create Stack',
  CreateStackFail = '[Facilities] Create Stack Fail',
  CreateStackSuccess = '[Facilities] Create Stack Success',

  RemoveStack = '[Facilities] Remove Stack',
  RemoveStackFail = '[Facilities] Remove Stack Fail',
  RemoveStackSuccess = '[Facilities] Remove Stack Success',

  UpdateStack = '[Facilities] Update Stack',
  UpdateStackFail = '[Facilities] Update Stack Fail',
  UpdateStackSuccess = '[Facilities] Update Stack Success',

  ClearStacks = '[Facilities] Clear Stacks',

  SelectStacks = '[Facilities] Select Stacks',
}

export class StacksLoad implements Action {
  readonly type = StackActionTypes.LoadStacks;
}

export class StacksLoadFail implements Action {
  readonly type = StackActionTypes.LoadStacksFail;

  constructor(public readonly payload: any) {}
}

export class StacksLoadSuccess implements Action {
  readonly type = StackActionTypes.LoadStacksSuccess;

  constructor(public readonly payload: Stack[]) {}
}

export class StackCreate implements Action {
  readonly type = StackActionTypes.CreateStack;

  constructor(public readonly payload: Stack) {}
}

export class StackCreateFail implements Action {
  readonly type = StackActionTypes.CreateStackFail;

  constructor(public readonly payload: any) {}
}

export class StackCreateSuccess implements Action {
  readonly type = StackActionTypes.CreateStackSuccess;

  constructor(public readonly payload: Stack) {}
}

export class StackRemove implements Action {
  readonly type = StackActionTypes.RemoveStack;

  constructor(public readonly payload: Stack) {}
}

export class StackRemoveFail implements Action {
  readonly type = StackActionTypes.RemoveStackFail;

  constructor(public readonly payload: any) {}
}

export class StackRemoveSuccess implements Action {
  readonly type = StackActionTypes.RemoveStackSuccess;

  constructor(public readonly payload: Stack) {}
}

export class StackUpdate implements Action {
  readonly type = StackActionTypes.UpdateStack;

  constructor(public readonly payload: Stack) {}
}

export class StackUpdateFail implements Action {
  readonly type = StackActionTypes.UpdateStackFail;

  constructor(public readonly payload: any) {}
}

export class StackUpdateSuccess implements Action {
  readonly type = StackActionTypes.UpdateStackSuccess;

  constructor(public readonly payload: Update<Stack>) {}
}

export class StacksClear implements Action {
  readonly type = StackActionTypes.ClearStacks;
}

export class StacksSelect implements Action {
  readonly type = StackActionTypes.SelectStacks;

  constructor(public readonly payload: string[]) {}
}

export type StackActions =
  | StacksLoad
  | StacksLoadFail
  | StacksLoadSuccess
  | StackCreate
  | StackCreateFail
  | StackCreateSuccess
  | StackRemove
  | StackRemoveFail
  | StackRemoveSuccess
  | StackUpdate
  | StackUpdateFail
  | StackUpdateSuccess
  | StacksClear
  | StacksSelect;
