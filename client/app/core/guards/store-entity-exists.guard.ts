import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Action, Store, select, MemoizedSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { StoreEntitiesGuard } from './store-entities.guard';
import { debug } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export abstract class StoreEntityExistsGuard<T, A extends Action, D>
  extends StoreEntitiesGuard<T, A>
  implements CanActivate {
  protected abstract entities: MemoizedSelector<object, Dictionary<D>>;

  canActivate(
    next: ActivatedRouteSnapshot,
    _state?: RouterStateSnapshot
  ): Observable<boolean> {
    debug(`CanActive: Entity Exists? ${next.params[this.param]}`);
    return this.checkStore().pipe(
      switchMap(() =>
        this.hasEntity(next.params[this.param]).pipe(
          catchError(error =>
            of(error).pipe(
              tap(e =>
                debug(
                  `Something went wrong checking entity exists: ${e.message}`
                )
              )
            )
          )
        )
      )
    );
  }

  protected hasEntity(id: string): Observable<boolean> {
    return this.store.pipe(
      select(this.entities),
      map(entities => Boolean(entities[id])),
      tap(result => debug(`The entity with ${id} was found? ${result}`))
    );
  }

  get param(): string {
    return (
      this.constructor.name
        .replace(/ExistsGuard$/, '')
        .replace(/[A-Z]/g, (char, index) => (index ? `_${char}` : char))
        .toLowerCase() + '_id'
    );
  }
}
