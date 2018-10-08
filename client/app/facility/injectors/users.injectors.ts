import { InjectionToken } from '@angular/core';

import * as fromStore from '@facility/store';

export const USERS_LOAD = new InjectionToken<fromStore.UsersLoad>('UsersLoad', {
  factory: () => new fromStore.UsersLoad(),
});
