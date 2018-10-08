import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { StackVariant } from '@facility/models';

export enum StackVariantActionTypes {
  LoadStackVariants = '[Facilities] Load StackVariants',
  LoadStackVariantsFail = '[Facilities] Load StackVariants Fail',
  LoadStackVariantsSuccess = '[Facilities] Load StackVariants Success',

  CreateStackVariant = '[Facilities] Create StackVariant',
  CreateStackVariantFail = '[Facilities] Create StackVariant Fail',
  CreateStackVariantSuccess = '[Facilities] Create StackVariant Success',

  RemoveStackVariant = '[Facilities] Remove StackVariant',
  RemoveStackVariantFail = '[Facilities] Remove StackVariant Fail',
  RemoveStackVariantSuccess = '[Facilities] Remove StackVariant Success',

  UpdateStackVariant = '[Facilities] Update StackVariant',
  UpdateStackVariantFail = '[Facilities] Update StackVariant Fail',
  UpdateStackVariantSuccess = '[Facilities] Update StackVariant Success',

  ClearStackVariants = '[Facilities] Clear StackVariants',

  SelectStackVariants = '[Facilities] Select StackVariants',
}

export class StackVariantsLoad implements Action {
  readonly type = StackVariantActionTypes.LoadStackVariants;
}

export class StackVariantsLoadFail implements Action {
  readonly type = StackVariantActionTypes.LoadStackVariantsFail;

  constructor(public readonly payload: any) {}
}

export class StackVariantsLoadSuccess implements Action {
  readonly type = StackVariantActionTypes.LoadStackVariantsSuccess;

  constructor(public readonly payload: StackVariant[]) {}
}

export class StackVariantCreate implements Action {
  readonly type = StackVariantActionTypes.CreateStackVariant;

  constructor(public readonly payload: StackVariant) {}
}

export class StackVariantCreateFail implements Action {
  readonly type = StackVariantActionTypes.CreateStackVariantFail;

  constructor(public readonly payload: any) {}
}

export class StackVariantCreateSuccess implements Action {
  readonly type = StackVariantActionTypes.CreateStackVariantSuccess;

  constructor(public readonly payload: StackVariant) {}
}

export class StackVariantRemove implements Action {
  readonly type = StackVariantActionTypes.RemoveStackVariant;

  constructor(public readonly payload: StackVariant) {}
}

export class StackVariantRemoveFail implements Action {
  readonly type = StackVariantActionTypes.RemoveStackVariantFail;

  constructor(public readonly payload: any) {}
}

export class StackVariantRemoveSuccess implements Action {
  readonly type = StackVariantActionTypes.RemoveStackVariantSuccess;

  constructor(public readonly payload: StackVariant) {}
}

export class StackVariantUpdate implements Action {
  readonly type = StackVariantActionTypes.UpdateStackVariant;

  constructor(public readonly payload: StackVariant) {}
}

export class StackVariantUpdateFail implements Action {
  readonly type = StackVariantActionTypes.UpdateStackVariantFail;

  constructor(public readonly payload: any) {}
}

export class StackVariantUpdateSuccess implements Action {
  readonly type = StackVariantActionTypes.UpdateStackVariantSuccess;

  constructor(public readonly payload: Update<StackVariant>) {}
}

export class StackVariantsClear implements Action {
  readonly type = StackVariantActionTypes.ClearStackVariants;
}

export class StackVariantsSelect implements Action {
  readonly type = StackVariantActionTypes.SelectStackVariants;

  constructor(public readonly payload: string[]) {}
}

export type StackVariantActions =
  | StackVariantsLoad
  | StackVariantsLoadFail
  | StackVariantsLoadSuccess
  | StackVariantCreate
  | StackVariantCreateFail
  | StackVariantCreateSuccess
  | StackVariantRemove
  | StackVariantRemoveFail
  | StackVariantRemoveSuccess
  | StackVariantUpdate
  | StackVariantUpdateFail
  | StackVariantUpdateSuccess
  | StackVariantsClear
  | StackVariantsSelect;
