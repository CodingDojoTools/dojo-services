import { createSelector } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromFeature from '../reducers';
import * as fromStacks from '../reducers/stacks.reducer';

import { Stack } from '@facility/models';

export const getStacksState = createSelector(
  fromFeature.getFacilitiesState,
  (state: fromFeature.FacilitiesState) => state.stacks
);

export const getStackEntities = createSelector(
  getStacksState,
  fromStacks.getStackEntities
);

export const getStacksLoading = createSelector(
  getStacksState,
  fromStacks.getStacksLoading
);

export const getStacksLoaded = createSelector(
  getStacksState,
  fromStacks.getStacksLoaded
);

export const getStacksIds = createSelector(
  getStacksState,
  fromStacks.getStacksIds
);

export const getStacks = createSelector(getStackEntities, entities =>
  Object.values(entities)
);

export const getSelectedStack = createSelector(
  getStackEntities,
  fromRoot.getRouterState,
  (entities, router): Stack =>
    router.state && entities[router.state.params.stack_id]
);

export const getSelectedStacks = createSelector(
  getStacksState,
  fromStacks.getSelectedStacks
);

export const getSelectStacks = createSelector(
  getStackEntities,
  getSelectedStacks,
  (entities, selected) =>
    selected.map(id => entities[id]).filter(stack => stack)
);
