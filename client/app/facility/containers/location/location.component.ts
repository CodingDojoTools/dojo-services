import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Location, Stack } from '@facility/models';
import { User } from '@auth/models';

import * as fromStore from '@facility/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent implements OnInit {
  location$: Observable<Location>;
  employees$: Observable<string[]>;
  users$: Observable<User[]>;
  stacks$: Observable<Stack[]>;
  selectedStacks$: Observable<string[]>;

  constructor(private readonly store: Store<fromStore.FacilitiesState>) {}

  ngOnInit() {
    this.location$ = this.store.pipe(
      select(fromStore.getSelectedLocation),
      tap((location = null) => {
        const locationExists = location && Array.isArray(location.employees);

        const employees = locationExists ? [...location.employees] : [];
        const stacks = locationExists ? [...location.stacks] : [];

        this.store.dispatch(new fromStore.UsersSelect(employees));
        this.store.dispatch(new fromStore.StacksSelect(stacks));
      })
    );

    this.selectedStacks$ = this.store.pipe(select(fromStore.getSelectedStacks));
    this.employees$ = this.store.pipe(select(fromStore.getSelectedUsers));
    this.stacks$ = this.store.pipe(select(fromStore.getStacks));
    this.users$ = this.store.pipe(select(fromStore.getUsers));
  }

  onCreate(event: Location) {
    this.store.dispatch(new fromStore.LocationCreate(event));
  }

  onUpdate(event: Location) {
    this.store.dispatch(new fromStore.LocationUpdate(event));
  }

  onRemove(event: Location) {
    this.store.dispatch(new fromStore.LocationRemove(event));
  }

  onCancel() {
    this.store.dispatch(new fromRoot.Back());
  }
}
