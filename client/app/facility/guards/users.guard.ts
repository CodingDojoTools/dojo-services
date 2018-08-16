import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, take, switchMap, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromStore from '../store';

@Injectable({
  providedIn: 'root',
})
export class UsersGuard implements CanActivate {
  constructor(private store: Store<fromStore.FacilitiesState>) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getUsersLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.UsersLoad());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
