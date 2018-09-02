import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreEntitiesGuard } from '@app/core';

import * as fromInjectors from '@facility/injectors';
import * as fromStore from '@facility/store';

@Injectable({
  providedIn: 'root',
})
export class UsersGuard extends StoreEntitiesGuard<
  fromStore.FacilitiesState,
  fromStore.UserActions
> {
  selector = fromStore.getUsersLoaded;

  constructor(
    protected readonly store: Store<fromStore.FacilitiesState>,
    @Inject(fromInjectors.USERS_LOAD) protected loader: fromStore.UsersLoad
  ) {
    super(store, loader);
  }
}
