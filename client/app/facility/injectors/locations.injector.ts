import { InjectionToken } from '@angular/core';

import * as fromStore from '../store';

export const LOCATIONS_LOAD = new InjectionToken<fromStore.LocationsLoad>(
  'LocationsLoad',
  {
    factory: () => new fromStore.LocationsLoad(),
  }
);
