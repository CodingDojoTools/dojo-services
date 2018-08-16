import { createSelector } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromFeature from '../reducers';
import * as fromUsers from '../reducers/users.reducer';

import { User } from '@auth/models';

export const getUserState = createSelector(
  fromFeature.getFacilitiesState,
  (state: fromFeature.FacilitiesState) => state.users
);

export const getUserEntities = createSelector(
  getUserState,
  fromUsers.getUserEntities
);

export const getUsersLoading = createSelector(
  getUserState,
  fromUsers.getUsersLoading
);

export const getUsersLoaded = createSelector(
  getUserState,
  fromUsers.getUsersLoaded
);

export const getUsersIds = createSelector(getUserState, fromUsers.getUsersIds);

export const getUsers = createSelector(getUserEntities, entities =>
  Object.values(entities)
);

export const getSelectedUser = createSelector(
  getUserEntities,
  fromRoot.getRouterState,
  (entities, router): User => {
    return router.state && entities[router.state.root.params.user_id];
  }
);
