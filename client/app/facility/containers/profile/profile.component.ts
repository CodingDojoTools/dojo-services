import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '@facility/store';
import { Location } from '@facility/models';
import { User } from '@app/auth/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  locations$: Observable<Location[]>;

  constructor(private readonly store: Store<fromStore.FacilitiesState>) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromStore.getSelectedUser));
    this.locations$ = this.store.pipe(select(fromStore.getLocations));
  }

  onUpdate(event: User) {
    this.store.dispatch(new fromStore.UserUpdate(event));
  }
}
