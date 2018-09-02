import { createSelector } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromFeature from '../reducers';
import * as fromStackVariants from '../reducers/stack-variants.reducer';

import { StackVariant } from '@facility/models';

export const getStackVariantsState = createSelector(
  fromFeature.getFacilitiesState,
  (state: fromFeature.FacilitiesState) => state.stackVariants
);

export const getStackVariantEntities = createSelector(
  getStackVariantsState,
  fromStackVariants.getStackVariantEntities
);

export const getStackVariantsLoading = createSelector(
  getStackVariantsState,
  fromStackVariants.getStackVariantsLoading
);

export const getStackVariantsLoaded = createSelector(
  getStackVariantsState,
  fromStackVariants.getStackVariantsLoaded
);

export const getStackVariantsIds = createSelector(
  getStackVariantsState,
  fromStackVariants.getStackVariantsIds
);

export const getStackVariants = createSelector(
  getStackVariantEntities,
  entities => Object.values(entities)
);

export const getSelectedStackVariant = createSelector(
  getStackVariantEntities,
  fromRoot.getRouterState,
  (entities, router): StackVariant =>
    router.state && entities[router.state.params.stackVariant_id]
);

export const getSelectedStackVariants = createSelector(
  getStackVariantsState,
  fromStackVariants.getSelectedStackVariants
);

export const getSelectStackVariants = createSelector(
  getStackVariantEntities,
  getSelectedStackVariants,
  (entities, selected) =>
    selected.map(id => entities[id]).filter(stackVariant => stackVariant)
);
