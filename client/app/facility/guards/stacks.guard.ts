import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreEntitiesGuard } from '@app/core';

import * as fromInjectors from '@facility/injectors';
import * as fromStore from '@facility/store';

@Injectable({
  providedIn: 'root',
})
export class StacksGuard extends StoreEntitiesGuard<
  fromStore.FacilitiesState,
  fromStore.StackActions
> {
  selector = fromStore.getStacksLoaded;

  constructor(
    protected readonly store: Store<fromStore.FacilitiesState>,
    @Inject(fromInjectors.STACKS_LOAD) protected loader: fromStore.StacksLoad
  ) {
    super(store, loader);
  }
}
