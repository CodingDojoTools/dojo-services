import { CanActivate, CanLoad } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromStore from '../store';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoggedIn),
      tap(authed => {
        if (!authed) {
          this.store.dispatch(new fromStore.LoginRedirect());
        }
      }),
      take(1)
    );
  }

  canLoad() {
    return this.canActivate();
  }
}
