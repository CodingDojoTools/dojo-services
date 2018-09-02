import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreEntityExistsGuard } from '@app/core';
import { Stack } from '@facility/models';

import * as fromInjectors from '@facility/injectors';
import * as fromStore from '@facility/store';

@Injectable({
  providedIn: 'root',
})
export class StackExistsGuard extends StoreEntityExistsGuard<
  fromStore.FacilitiesState,
  fromStore.StackActions,
  Stack
> {
  selector = fromStore.getStacksLoaded;
  entities = fromStore.getStackEntities;

  constructor(
    protected readonly store: Store<fromStore.FacilitiesState>,
    @Inject(fromInjectors.STACKS_LOAD) protected loader: fromStore.StacksLoad
  ) {
    super(store, loader);
  }
}
