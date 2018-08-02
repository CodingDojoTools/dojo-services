import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '@env/environment';

import { DashboardModule } from '@app/dashboard';
import { AuthGuard } from '@auth/guards';

import * as fromContainers from './containers';

const enableTracing = true && !environment.production;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => DashboardModule,
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
