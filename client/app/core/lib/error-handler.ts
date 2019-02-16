import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse) {
    console.log('it happens', error);
    if (this.isResponseError(error)) {
      return this.handleConnectionOrServer(error);
    }

    // handle client error;
    this.handleClientError(error);
  }

  private handleClientError(error: Error) {}

  private handleOffline(error: HttpErrorResponse) {}

  private handleConnectionOrServer(error: HttpErrorResponse) {
    if (!navigator.onLine) {
      return this.handleOffline(error);
    }
  }

  private isResponseError(
    error: Error | HttpErrorResponse
  ): error is HttpErrorResponse {
    return error instanceof HttpErrorResponse;
  }
}
