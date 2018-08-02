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

const declarations: any[] = [MatSort, MatPaginator, MatNavList];

const exportable: any[] = [
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
