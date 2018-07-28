import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '@env/environment';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
