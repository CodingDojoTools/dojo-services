import { CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable, Inject } from '@angular/core';

import { StoreEntityExistsGuard } from '@app/core';

import * as fromInjectors from '../injectors';
import * as fromStore from '../store';
import { User } from '@auth/models';

@Injectable({
  providedIn: 'root',
})
export class UserExistsGuard
  extends StoreEntityExistsGuard<
    fromStore.FacilitiesState,
    fromStore.UserActions,
    User
  >
  implements CanActivateChild {
  selector = fromStore.getUsersLoaded;
  entities = fromStore.getUserEntities;

  constructor(
    protected readonly store: Store<fromStore.FacilitiesState>,
    @Inject(fromInjectors.USERS_LOAD)
    protected readonly loader: fromStore.UsersLoad
  ) {
    super(store, loader);
  }

  canActivateChild(next: ActivatedRouteSnapshot) {
    return this.canActivate(next);
  }
}
