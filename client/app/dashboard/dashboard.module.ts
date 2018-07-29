import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [...fromContainers.containers, ...fromComponents.components],
})
export class DashboardModule {}
