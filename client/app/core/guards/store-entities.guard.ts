import { filter, take, switchMap, tap, catchError } from 'rxjs/operators';
import { Store, select, MemoizedSelector, Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export abstract class StoreEntitiesGuard<T, A extends Action>
  implements CanActivate {
  protected abstract readonly selector: MemoizedSelector<object, boolean>;

  constructor(
    protected readonly store: Store<T>,
    protected readonly loader: A
  ) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  protected checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(this.selector),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(this.loader);
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
