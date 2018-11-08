import {
  filter,
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom,
  switchMap,
  take,
} from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RouterReducerState } from '@ngrx/router-store';
import { SocialUser } from 'angularx-social-login';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromActions from '../actions';
import * as fromRoot from '@app/store';

import { LocalStorageService } from '@app/core/services';
import { AuthenticationService } from '@auth/services';
import { LoggedUser } from '@auth/models';
import { AUTH_KEY } from '@app/config';
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
  googleLogout$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.GoogleLogout),
    exhaustMap(() =>
      this.authService.googleLogout().pipe(
        map(() => new fromActions.Logout()),
        catchError(error => of(new fromActions.LogoutFailure(error)))
      )
    )
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
    withLatestFrom(this.store.pipe(select(fromRoot.getRouterState))),
    map(([logged, router]) => [logged, this.returnUrl(router)]),
    map(
      ([logged, url]: [LoggedUser, string]) =>
        logged.isNew ? `/facilities/users/${logged.user._id}/profile` : url
    ),
    tap(path => debug(`Path after logging in is ${path}`)),
    exhaustMap(path => of(new fromRoot.Go({ path: [path] }))),
    catchError(error => of(new fromActions.LoginFailure(error)))
  );

  @Effect({ dispatch: false })
  loginPersist$ = this.actions$.pipe(
    ofType<fromActions.LoginSuccess>(fromActions.AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    tap(payload =>
      this.localStorageService.setItem(AUTH_KEY, { status: payload })
    )
  );

  @Effect()
  loginRedirect$ = this.actions$.pipe(
    ofType(
      fromActions.AuthActionTypes.CurrentUserFailure,
      fromActions.AuthActionTypes.LogoutSuccess,
      fromActions.AuthActionTypes.LogoutFailure,
      fromActions.AuthActionTypes.LoginRedirect
    ),
    map(action => this.returnUrl(action)),
    exhaustMap(url =>
      of(new fromRoot.Go({ path: ['/login'], query: { returnUrl: url } }))
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.Logout),
    exhaustMap(() =>
      this.authService.logout().pipe(
        map(user => new fromActions.LogoutSuccess(user)),
        catchError(error => of(new fromActions.LogoutFailure(error)))
      )
    ),
    tap(() => this.localStorageService.removeItem(AUTH_KEY))
  );

  @Effect()
  retrieveCurrentUser$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.CurrentUser),
    exhaustMap(() =>
      this.authService.retrieveCurrentUser().pipe(
        map(user => new fromActions.CurrentUserSuccess({ user })),
        catchError(error => of(new fromActions.CurrentUserFailure(error)))
      )
    )
  );

  @Effect()
  retrieveCurrentUserSuccess$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.CurrentUserSuccess),
    switchMap(() =>
      this.store.pipe(
        select(fromRoot.getRouterState),
        filter(router => Boolean(router)),
        map(router => this.returnUrl(router)),
        map(path => new fromRoot.Go({ path: [path] })),
        take(1)
      )
    )
  );

  @Effect()
  authInit$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.AuthInit),
    map(() => this.authService.isTokenNotExpired()),
    filter(expired => expired),
    map(() => new fromActions.CurrentUser())
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<fromRoot.State>,
    private readonly authService: AuthenticationService,
    private readonly localStorageService: LocalStorageService
  ) {}

  private returnUrl<T extends Action>(
    actionRouter: RouterReducerState<fromRoot.RouterStateUrl> | T
  ): string {
    let url: string;

    if (this.isAction(actionRouter)) {
      if (actionRouter instanceof fromActions.LoginRedirect) {
        url = actionRouter.payload;
      }
    } else {
      url = actionRouter.state.queryParams.returnUrl as string;
    }

    return url || '/';
  }

  private isAction(action: any): action is Action {
    return Boolean(action.type);
  }
}
