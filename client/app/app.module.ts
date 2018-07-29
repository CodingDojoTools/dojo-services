import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SocialLoginModule } from 'angularx-social-login';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

// config
import { getAuthServiceConfigs } from '@app/config';

import * as fromRoot from '@app/root';

import { SharedModule } from '@app/shared';
import { DashboardModule } from '@app/dashboard';

@NgModule({
  declarations: [AppComponent, ...fromRoot.components, ...fromRoot.containers],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    FontAwesomeModule,
    HttpClientModule,
    SocialLoginModule.initialize(getAuthServiceConfigs()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
