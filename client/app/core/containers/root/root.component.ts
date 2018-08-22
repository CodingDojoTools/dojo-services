import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, defer } from 'rxjs';

import * as fromStore from '@auth/store';
import * as fromRoot from '@app/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  constructor(private readonly store: Store<fromStore.State>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(fromStore.getLoggedIn));
    this.store.dispatch(new fromStore.AuthInit());
  }

  onLogout() {
    this.store.dispatch(new fromStore.Logout());
  }
}
