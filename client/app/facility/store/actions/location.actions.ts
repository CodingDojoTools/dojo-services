import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Location } from '../../models';

export enum LocationActionTypes {
  LoadLocations = '[Facilities] Load Locations',
  LoadLocationsFail = '[Facilities] Load Locations Fail',
  LoadLocationsSuccess = '[Facilities] Load Locations Success',

  UpdateLocation = '[Facilities] Update Location',
  UpdateLocationFail = '[Facilities] Update Location Fail',
  UpdateLocationSuccess = '[Facilities] Update Location Success',

  RemoveLocation = '[Facilities] Remove Location',
  RemoveLocationFail = '[Facilities] Remove Location Fail',
  RemoveLocationSuccess = '[Facilities] Remove Location Success',

  CreateLocation = '[Facilities] Create Location',
  CreateLocationFail = '[Facilities] Create Location Fail',
  CreateLocationSuccess = '[Facilities] Create Location Success',

  ClearLocations = '[Facilities] Clear Locations',
}

export class LocationsLoad implements Action {
  readonly type = LocationActionTypes.LoadLocations;
}

export class LocationsLoadFail implements Action {
  readonly type = LocationActionTypes.LoadLocationsFail;

  constructor(public readonly payload: any) {}
}

export class LocationsLoadSuccess implements Action {
  readonly type = LocationActionTypes.LoadLocationsSuccess;

  constructor(public readonly payload: Location[]) {}
}

export class LocationCreate implements Action {
  readonly type = LocationActionTypes.CreateLocation;

  constructor(public readonly payload: Location) {}
}

export class LocationCreateFail implements Action {
  readonly type = LocationActionTypes.CreateLocationFail;

  constructor(public readonly payload: any) {}
}

export class LocationCreateSuccess implements Action {
  readonly type = LocationActionTypes.CreateLocationSuccess;

  constructor(public readonly payload: Location) {}
}

export class LocationRemove implements Action {
  readonly type = LocationActionTypes.RemoveLocation;

  constructor(public readonly payload: Location) {}
}

export class LocationRemoveFail implements Action {
  readonly type = LocationActionTypes.RemoveLocationFail;

  constructor(public readonly payload: any) {}
}

export class LocationRemoveSuccess implements Action {
  readonly type = LocationActionTypes.RemoveLocationSuccess;

  constructor(public readonly payload: Location) {}
}

export class LocationUpdate implements Action {
  readonly type = LocationActionTypes.UpdateLocation;

  constructor(public readonly payload: Location) {}
}

export class LocationUpdateFail implements Action {
  readonly type = LocationActionTypes.UpdateLocationFail;

  constructor(public readonly payload: any) {}
}

export class LocationUpdateSuccess implements Action {
  readonly type = LocationActionTypes.UpdateLocationSuccess;

  constructor(public readonly payload: Update<Location>) {}
}

export class LocationsClear implements Action {
  readonly type = LocationActionTypes.ClearLocations;
}

export type LocationActions =
  | LocationsLoad
  | LocationsLoadFail
  | LocationsLoadSuccess
  | LocationCreateFail
  | LocationCreateSuccess
  | LocationRemove
  | LocationRemoveFail
  | LocationRemoveSuccess
  | LocationUpdate
  | LocationUpdateFail
  | LocationUpdateSuccess
  | LocationsClear;
