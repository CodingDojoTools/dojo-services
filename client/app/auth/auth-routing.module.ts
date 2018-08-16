import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: 'login',
    component: fromContainers.HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
