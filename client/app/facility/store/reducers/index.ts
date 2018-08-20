import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromUsers from './users.reducer';
import * as fromLocations from './locations.reducer';

export interface FacilitiesState {
  locations: fromLocations.LocationState;
  users: fromUsers.UserState;
}

export const reducers: ActionReducerMap<FacilitiesState> = {
  locations: fromLocations.reducer,
  users: fromUsers.reducer,
};

export const getFacilitiesState = createFeatureSelector<FacilitiesState>(
  'facilities'
);
