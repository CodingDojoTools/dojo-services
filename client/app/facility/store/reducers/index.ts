import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromUsers from './users.reducer';
import * as fromLocations from './locations.reducer';
import * as fromStacks from './stacks.reducer';
import * as fromStackVariants from './stack-variants.reducer';

export interface FacilitiesState {
  locations: fromLocations.LocationState;
  users: fromUsers.UserState;
  stacks: fromStacks.StackState;
  stackVariants: fromStackVariants.StackVariantState;
}

export const reducers: ActionReducerMap<FacilitiesState> = {
  locations: fromLocations.reducer,
  users: fromUsers.reducer,
  stacks: fromStacks.reducer,
  stackVariants: fromStackVariants.reducer,
};

export const getFacilitiesState = createFeatureSelector<FacilitiesState>(
  'facilities'
);
