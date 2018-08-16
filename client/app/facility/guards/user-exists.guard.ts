import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromStore from '../store';

@Injectable({
  providedIn: 'root',
})
export class UserExistsGuard implements CanActivate {
  constructor(private readonly store: Store<fromStore.FacilitiesState>) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => this.hasUser(next.params.user_id))
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

  private hasUser(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getUserEntities),
      map(entities => Boolean(entities[id]))
    );
  }
}
