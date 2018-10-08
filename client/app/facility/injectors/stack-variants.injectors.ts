import { InjectionToken } from '@angular/core';

import * as fromStore from '@facility/store';

export const STACK_VARIANTS_LOAD = new InjectionToken<
  fromStore.StackVariantsLoad
>('StackVariantsLoad', {
  factory: () => new fromStore.StackVariantsLoad(),
});
