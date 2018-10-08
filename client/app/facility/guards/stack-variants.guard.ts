import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreEntitiesGuard } from '@app/core';

import * as fromInjectors from '@facility/injectors';
import * as fromStore from '@facility/store';

@Injectable({
  providedIn: 'root',
})
export class StackVariantsGuard extends StoreEntitiesGuard<
  fromStore.FacilitiesState,
  fromStore.StackVariantActions
> {
  selector = fromStore.getStackVariantsLoaded;

  constructor(
    protected readonly store: Store<fromStore.FacilitiesState>,
    @Inject(fromInjectors.STACK_VARIANTS_LOAD)
    protected loader: fromStore.StackVariantsLoad
  ) {
    super(store, loader);
  }
}
