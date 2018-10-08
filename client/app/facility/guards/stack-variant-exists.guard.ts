import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreEntityExistsGuard } from '@app/core';
import { StackVariant } from '@facility/models';

import * as fromInjectors from '@facility/injectors';
import * as fromStore from '@facility/store';

@Injectable({
  providedIn: 'root',
})
export class StackVariantExistsGuard extends StoreEntityExistsGuard<
  fromStore.FacilitiesState,
  fromStore.StackVariantActions,
  StackVariant
> {
  selector = fromStore.getStackVariantsLoaded;
  entities = fromStore.getStackVariantEntities;

  constructor(
    protected readonly store: Store<fromStore.FacilitiesState>,
    @Inject(fromInjectors.STACK_VARIANTS_LOAD)
    protected loader: fromStore.StackVariantsLoad
  ) {
    super(store, loader);
  }
}
