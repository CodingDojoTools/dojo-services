import { InjectionToken } from '@angular/core';

import * as fromStore from '@facility/store';

export const STACKS_LOAD = new InjectionToken<fromStore.StacksLoad>(
  'StacksLoad',
  {
    factory: () => new fromStore.StacksLoad(),
  }
);
