import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '@env/environment';

import { DashboardModule } from '@app/dashboard';
import * as fromContainers from './root/containers';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    component: fromContainers.HomeComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
