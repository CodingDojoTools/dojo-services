import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule, RootComponent } from '@app/core';
import { AuthModule } from '@auth/auth.module';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule,
    // AuthModule.forRoot(),
    CoreModule.forRoot(),
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {}
