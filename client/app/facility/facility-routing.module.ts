import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@auth/guards';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        component: fromContainers.UsersComponent,
        canActivate: [fromGuards.UsersGuard],
      },
      {
        path: ':user_id',
        canActivateChild: [
          fromGuards.UserExistsGuard,
          fromGuards.LocationsGuard,
        ],
        children: [
          {
            path: '',
            component: fromContainers.UserComponent,
          },
          {
            path: 'profile',
            component: fromContainers.ProfileComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'locations',
    children: [
      {
        path: '',
        component: fromContainers.LocationsComponent,
        canActivate: [fromGuards.LocationsGuard],
      },
      {
        path: 'new',
        component: fromContainers.LocationComponent,
      },
      {
        path: ':location_id',
        component: fromContainers.LocationComponent,
        canActivate: [fromGuards.LocationExistsGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilityRoutingModule {}
