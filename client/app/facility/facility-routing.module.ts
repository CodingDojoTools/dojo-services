import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@auth/guards';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: 'users',
    canActivateChild: [AuthGuard],
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
    canActivateChild: [AuthGuard],
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

  {
    path: 'stacks',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: fromContainers.StacksComponent,
        canActivate: [fromGuards.StacksGuard],
      },
      {
        path: 'new',
        component: fromContainers.StackComponent,
      },
      {
        path: ':stack_id',
        component: fromContainers.StackComponent,
        canActivate: [fromGuards.StackExistsGuard],
      },
    ],
  },

  {
    path: 'stack_variants',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: fromContainers.StackVariantsComponent,
        canActivate: [fromGuards.StackVariantsGuard],
      },
      {
        path: 'new',
        component: fromContainers.StackVariantComponent,
      },
      {
        path: ':stack_variant_id',
        component: fromContainers.StackVariantComponent,
        canActivate: [
          fromGuards.StackVariantExistsGuard,
          fromGuards.StacksGuard,
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
