import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatNavList,
  MatSidenavModule,
  MatPaginator,
  MatSort,
  MatTooltipModule,
  MatTableModule,
} from '@angular/material';

import * as fromComponents from './components';
import * as fromDirectives from './directives';
import * as fromPipes from './pipes';

const declarations: any[] = [
  MatSort,
  MatPaginator,
  MatNavList,
  ...fromComponents.components,
  ...fromDirectives.directives,
  ...fromPipes.pipes,
];

const exportable: any[] = [
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  MatSidenavModule,
  MatTableModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
];

@NgModule({
  declarations,
  imports: [CommonModule, ...exportable],
  exports: [CommonModule, ...exportable, ...declarations],
})
export class SharedModule {}
