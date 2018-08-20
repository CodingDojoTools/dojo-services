import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreEntitiesGuard } from '@app/core';

import * as fromInjector from '../injectors';
import * as fromStore from '../store';

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
    @Inject(fromInjector.USERS_LOAD) protected loader: fromStore.UsersLoad
  ) {
    super(store, loader);
  }
}
