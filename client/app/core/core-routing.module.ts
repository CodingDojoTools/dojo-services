import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '@env/environment';

import { AuthGuard } from '@auth/guards';

import * as fromContainers from './containers';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: '@app/dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'facilities',
    canLoad: [AuthGuard],
    loadChildren: '@facility/facility.module#FacilityModule',
  },
  {
    path: '**',
    component: fromContainers.NotFoundComponent,
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
export class CoreRoutingModule {}
