import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SocialUser } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as fromActions from '../actions';
import * as fromRoot from '@app/store';

import { AuthenticationService } from '@auth/services';
import { LoggedUser } from '@auth/models';
import { debug } from '@app/utils';

@Injectable()
export class AuthEffects {
  @Effect()
  googleLogin$ = this.actions$.pipe(
    ofType<fromActions.GoogleLogin>(fromActions.AuthActionTypes.GoogleLogin),
    exhaustMap(() =>
      this.authService.googleSignIn().pipe(
        map((user: SocialUser) => new fromActions.Login(user)),
        catchError(error => of(new fromActions.LoginFailure(error)))
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.LoginSuccess),
    map((action: fromActions.LoginSuccess) => action.payload),
    tap(logged =>
      debug(
        `Successfully logged in ${logged.user.firstName} ${
          logged.user.lastName
        }. First login? ${logged.isNew}`,
        logged
      )
    ),
    // map(
    //   (logged: LoggedUser) =>
    //     logged.isNew ? `/facilities/users/${logged.user._id}/profile` : '/'
    // ),
    map(logged => `/facilities/users/${logged.user._id}/profile`),
    tap(path => debug(`Path after logging in is ${path}`)),
    map(path => new fromRoot.Go({ path: [path] })),
    catchError(error => of(new fromActions.LoginFailure(error)))
  );

  @Effect()
  loginRedirect$ = this.actions$.pipe(
    ofType(
      fromActions.AuthActionTypes.LoginRedirect,
      fromActions.AuthActionTypes.Logout
    ),
    map(() => new fromRoot.Go({ path: ['/login'] }))
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap(socialUser =>
      this.authService.login(socialUser).pipe(
        map((user: LoggedUser) => new fromActions.LoginSuccess(user)),
        catchError(error => of(new fromActions.LoginFailure(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}
}
