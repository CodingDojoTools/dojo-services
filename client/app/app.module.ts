import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SocialLoginModule } from 'angularx-social-login';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// config
import { getAuthServiceConfigs } from '@app/config';

// env
import { environment } from '@env/environment';

import { effects, reducers, metaReducers } from '@app/store';
import { CoreModule, RootComponent } from '@app/core';
import { AuthModule } from '@auth/auth.module';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AuthModule.forRoot(),
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SocialLoginModule.initialize(getAuthServiceConfigs()),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'Dojo Services NgRx DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {}
