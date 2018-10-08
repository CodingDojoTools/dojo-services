import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { LocalStorageService } from '@app/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly bearer = /^Bearer\s/;

  constructor(private readonly localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.handleResponse(event);
        }
      })
    );
  }

  private handleResponse(response: HttpResponse<any>) {
    const header = response.headers.get('authorization');

    if (header && this.isBearer(header)) {
      const token = this.extractToken(header);

      this.localStorageService.setItem('access_token', token);
    }
  }

  private extractToken(header: string): string {
    return header.replace(this.bearer, '').trim();
  }

  private isBearer(header: string): boolean {
    return this.bearer.test(header);
  }
}
