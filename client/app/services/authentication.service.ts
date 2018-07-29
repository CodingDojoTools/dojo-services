import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

import { switchMap, tap } from 'rxjs/operators';
import { Observable, from, BehaviorSubject } from 'rxjs';

import { API } from '@shared/config';
import { User } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  private base = `${API}/auth`;

  // temporary
  isLoggedIn$ = new BehaviorSubject(false);
  loggedUser: SocialUser;

  constructor(
    private readonly http: HttpClient,
    private readonly socialService: AuthService
  ) {}

  ngOnInit() {
    this.socialService.authState.subscribe(user => {
      this.loggedUser = user;
      this.isLoggedIn$.next(this.loggedUser !== null);
    });
  }

  googleSignIn(): Observable<User> {
    return from(
      this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    ).pipe(switchMap(this.login.bind(this)));
  }

  verify(token: string) {
    return this.http
      .get<Boolean>(`${this.base}/verify/${token}`)
      .pipe(tap(() => localStorage.setItem('authToken', token)));
  }

  login(social: SocialUser): Observable<User> {
    return this.http.post<User>(
      `${this.base}/login/${social.provider.toLowerCase()}`,
      social
    );
  }

  logout() {
    return from(this.socialService.signOut()).pipe(
      tap(() => localStorage.removeItem('user'))
    );
  }
}
