import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreRoutingModule } from './core-routing.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';

export const COMPONENTS = [
  ...fromComponents.components,
  ...fromContainers.containers,
];

@NgModule({
  imports: [CoreRoutingModule, SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
