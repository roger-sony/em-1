import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Severity} from '@sentry/browser';
import * as Sentry from '@sentry/browser';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {AuthenticationService} from '../../../auth/auth.service';

/* tslint:disable:no-any */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          location.reload();
        }

        if (environment.sentryDsn && ![400, 401, 404, 500].includes(error.status)) {
          this.sendErrorToSentry(error);
        }

        const errorMessage = error.error.message || error.statusText;
        return throwError(errorMessage);
      })
    );
  }

  private sendErrorToSentry(error: any): void {
    if (error instanceof Error || error instanceof ErrorEvent) {
      Sentry.captureException(error);
    }

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        Sentry.captureException(error.error);
      }

      Sentry.captureMessage(`${error.status}: ${error.error}`, Severity.Error);
    }

    Sentry.captureMessage(error);
  }
}
