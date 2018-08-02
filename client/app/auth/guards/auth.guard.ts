import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromStore from '../store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new fromStore.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
