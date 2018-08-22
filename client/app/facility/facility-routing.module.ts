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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilityRoutingModule {}
