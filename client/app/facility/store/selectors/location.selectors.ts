import { createSelector } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromFeature from '../reducers';
import * as fromLocations from '../reducers/locations.reducer';

import { Location } from '@facility/models';

export const getLocationState = createSelector(
  fromFeature.getFacilitiesState,
  (state: fromFeature.FacilitiesState) => state.locations
);

export const getLocationEntities = createSelector(
  getLocationState,
  fromLocations.getLocationEntities
);

export const getLocationsLoading = createSelector(
  getLocationState,
  fromLocations.getLocationsLoading
);

export const getLocationsLoaded = createSelector(
  getLocationState,
  fromLocations.getLocationsLoaded
);

export const getLocationsIds = createSelector(
  getLocationState,
  fromLocations.getLocationsIds
);

export const getLocations = createSelector(getLocationEntities, entities =>
  Object.values(entities)
);

export const getSelectedLocation = createSelector(
  getLocationEntities,
  fromRoot.getRouterState,
  (entities, router): Location =>
    router.state && entities[router.state.params.location_id]
);
