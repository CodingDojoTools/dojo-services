import { CanActivate, CanLoad } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { map, take, withLatestFrom, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromStore from '@auth/store';
import * as fromRoot from '@app/store';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoggedIn),
      withLatestFrom(
        this.store.pipe(
          select(fromRoot.getRouterState),
          filter(router => Boolean(router))
        )
      ),
      map(([auth, router]) => [auth, router.state.url]),
      map(([authed, url]: [boolean, string]) => {
        if (!authed) {
          this.store.dispatch(new fromStore.LoginRedirect(url));
        }

        return authed;
      }),
      take(1)
    );
  }

  canLoad(): Observable<boolean> {
    return this.canActivate();
  }
}
