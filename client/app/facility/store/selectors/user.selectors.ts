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

export const getSelectedUsers = createSelector(
  getUserState,
  fromUsers.getSelectedUsers
);

export const getUsersIds = createSelector(getUserState, fromUsers.getUsersIds);

export const getUsers = createSelector(getUserEntities, entities =>
  Object.values(entities)
);

export const getSelectedUser = createSelector(
  getUserEntities,
  fromRoot.getRouterState,
  (entities, router): User =>
    router.state && entities[router.state.params.user_id]
);

export const getSelectUsers = createSelector(
  getUserEntities,
  getSelectedUsers,
  (users, selected): User[] => selected.map(id => users[id])
);
