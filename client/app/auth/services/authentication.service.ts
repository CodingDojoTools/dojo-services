import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API } from '@shared/config';
import { User } from '@auth/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private base = `${API}/auth`;

  constructor(
    private readonly http: HttpClient,
    private readonly socialService: AuthService
  ) {}

  googleSignIn(): Observable<SocialUser> {
    return from(this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID));
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
