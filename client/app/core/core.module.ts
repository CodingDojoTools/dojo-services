import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SocialLoginModule } from 'angularx-social-login';
import { JwtModule } from '@auth0/angular-jwt';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

// config
import { getAuthServiceConfigs, jwtOptions, initialState } from '@app/config';

// env
import { environment } from '@env/environment';

import { effects, reducers, metaReducers, CustomSerializer } from '@app/store';

import { SharedModule } from '@app/shared';
import { CoreRoutingModule } from './core-routing.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';

export const COMPONENTS = [
  ...fromComponents.components,
  ...fromContainers.containers,
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    CoreRoutingModule,
    SocialLoginModule.initialize(getAuthServiceConfigs()),
    JwtModule.forRoot(jwtOptions),
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'Dojo Services NgRx DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(effects),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer,
        },
        ...fromServices.services,
      ],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule?: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
