import { catchError, map, switchMap, toArray } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { of } from 'rxjs';

import { UserService } from '../../services';
import { UserActionTypes } from '../actions';
import * as fromActions from '../actions';

@Injectable()
export class UserEffects {
  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    switchMap(() =>
      this.userService.index().pipe(
        map(users => new fromActions.UsersLoadSuccess(users)),
        catchError(error => of(new fromActions.UsersLoadFail(error)))
      )
    )
  );

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUser),
    map((action: fromActions.UserLoad) => action.payload),
    switchMap(show =>
      this.userService.show(show).pipe(
        toArray(),
        map(users => new fromActions.UsersLoadSuccess(users)),
        catchError(error => of(new fromActions.UserLoadFail(error)))
      )
    )
  );

  @Effect()
  removeUser$ = this.actions$.pipe(
    ofType(UserActionTypes.RemoveUser),
    map((action: fromActions.UserRemove) => action.payload),
    switchMap(remove =>
      this.userService.destroy(remove._id).pipe(
        map(user => new fromActions.UserRemoveSuccess(user)),
        catchError(error => of(new fromActions.UserRemoveFail(error)))
      )
    )
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(UserActionTypes.UpdateUser),
    map((action: fromActions.UserUpdate) => action.payload),
    switchMap(update =>
      this.userService.update(update).pipe(
        map(
          changes =>
            new fromActions.UserUpdateSuccess({
              id: changes._id,
              changes,
            })
        ),
        catchError(error => of(new fromActions.UserUpdateFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private readonly userService: UserService
  ) {}
}
