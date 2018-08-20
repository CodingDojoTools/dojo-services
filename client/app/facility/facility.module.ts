import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FacilityRoutingModule } from './facility-routing.module';
import { SharedModule } from '@app/shared';

import { reducers, effects } from './store';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FacilityRoutingModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature('facilities', reducers),
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  providers: [...fromServices.services, ...fromGuards.guards],
})
export class FacilityModule {}
