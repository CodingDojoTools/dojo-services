import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreEntityExistsGuard } from '@app/core';

import * as fromInjectors from '../injectors';
import * as fromStore from '../store';
import { Location } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocationExistsGuard extends StoreEntityExistsGuard<
  fromStore.FacilitiesState,
  fromStore.LocationActions,
  Location
> {
  selector = fromStore.getLocationsLoaded;
  entities = fromStore.getLocationEntities;

  constructor(
    protected readonly store: Store<fromStore.FacilitiesState>,
    @Inject(fromInjectors.LOCATIONS_LOAD)
    protected loader: fromStore.LocationsLoad
  ) {
    super(store, loader);
  }
}
