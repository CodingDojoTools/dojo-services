import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

import { Observable, from } from 'rxjs';

import { User, LoggedUser } from '@auth/models';
import { API } from '@app/config';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private base = `${API}/auth`;

  constructor(
    private readonly http: HttpClient,
    private readonly socialService: AuthService,
    private readonly jwtHelper: JwtHelperService
  ) {}

  googleSignIn(): Observable<SocialUser> {
    return from(this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID));
  }

  googleLogout() {
    return from(this.socialService.signOut());
  }

  verify(token: string) {
    return this.http.get<Boolean>(`${this.base}/verify/${token}`);
  }

  login(social: SocialUser): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(
      `${this.base}/login/${social.provider.toLowerCase()}`,
      social
    );
  }

  logout(): Observable<User> {
    return this.http.delete<User>(`${this.base}/logout`);
  }

  retrieveCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.base}/loggedInUser`);
  }

  // wrap jwtHelperService methods

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired();
  }

  isTokenNotExpired(): boolean {
    return !this.isTokenExpired();
  }

  tokenExpiration(): Date {
    return this.jwtHelper.getTokenExpirationDate();
  }

  decodeToken<T>(token: string): T {
    return this.jwtHelper.decodeToken(token);
  }
}
