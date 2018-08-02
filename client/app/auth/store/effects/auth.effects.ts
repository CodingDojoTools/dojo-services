import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SocialUser } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as fromActions from '../actions';
import * as fromRoot from '@app/store';

import { AuthenticationService } from '@auth/services';
import { User } from '@auth/models';

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
    map(() => new fromRoot.Go({ path: ['/'] }))
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
        map((user: User) => new fromActions.LoginSuccess({ user })),
        catchError(error => of(new fromActions.LoginFailure(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}
}
