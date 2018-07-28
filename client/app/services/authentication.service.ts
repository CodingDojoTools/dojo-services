import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

import { switchMap, tap, take } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private base = '/api/auth';

  constructor(
    private readonly http: HttpClient,
    private readonly socialService: AuthService
  ) {}

  googleSignIn(): Observable<User> {
    return from(
      this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    ).pipe(
      tap(social => console.log('got social user', social)),
      switchMap(this.login.bind(this))
    );
  }

  verify(token: string) {
    return this.http
      .get<Boolean>(`${this.base}/verify/${token}`)
      .pipe(tap(() => localStorage.setItem('authToken', token)));
  }

  login(social: SocialUser): Observable<User> {
    return this.http.post<User>(
      `${this.base}/login/${social.provider}`,
      social
    );
  }

  logout() {
    return from(this.socialService.signOut());
  }
}
