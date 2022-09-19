import {ErrorHandler, Injectable} from '@angular/core';
import * as Sentry from '@sentry/browser';
import {environment} from '../../../environments/environment';

if (environment.sentryDsn) {
  Sentry.init({
    dsn: environment.sentryDsn,
    environment: environment.envName || '',
    ignoreErrors: ['event.data.split is not a function'],
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  // tslint:disable-next-line:no-any
  public handleError(error: any): void {
    if (/Loading chunk [\d]+ failed/.test(error?.message)) {
      window.location.reload();
      return;
    }

    if (environment.sentryDsn) {
      Sentry.captureException(error.originalError || error);
    }

    throw error;
  }
}
