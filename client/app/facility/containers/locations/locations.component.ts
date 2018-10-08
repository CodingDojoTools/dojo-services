import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '@facility/store';
import * as fromRoot from '@app/store';

import { Location } from '@facility/models';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsComponent implements OnInit {
  locations$: Observable<Location[]>;

  constructor(private readonly store: Store<fromStore.FacilitiesState>) {}

  ngOnInit() {
    this.locations$ = this.store.pipe(select(fromStore.getLocations));
  }
}
