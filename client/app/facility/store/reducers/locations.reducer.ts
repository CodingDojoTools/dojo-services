import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { LocationActions, LocationActionTypes } from '../actions';

import { Location } from '@facility/models';

export interface LocationState extends EntityState<Location> {
  loading: boolean;
  loaded: boolean;
}

const adapter = createEntityAdapter<Location>({
  selectId: location => location._id,
});

const initialState = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export function reducer(state = initialState, action: LocationActions) {
  switch (action.type) {
    case LocationActionTypes.LoadLocations:
      return {
        ...state,
        loading: true,
      };

    case LocationActionTypes.LoadLocationsSuccess:
      return {
        ...adapter.addMany(action.payload, state),
        loading: false,
        loaded: true,
      };

    case LocationActionTypes.LoadLocationsFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };

    case LocationActionTypes.CreateLocationSuccess:
      return adapter.addOne(action.payload, state);

    case LocationActionTypes.UpdateLocationSuccess:
      return adapter.updateOne(action.payload, state);

    case LocationActionTypes.RemoveLocationSuccess:
      return adapter.removeOne(action.payload._id, state);

    case LocationActionTypes.ClearLocations:
      return initialState;

    default:
      return state;
  }
}

export const getLocationEntities = (state: LocationState) => state.entities;
export const getLocationsLoading = (state: LocationState) => state.loading;
export const getLocationsLoaded = (state: LocationState) => state.loaded;
export const getLocationsIds = (state: LocationState) => state.ids;
