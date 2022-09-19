import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule, Optional, SkipSelf} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {httpInterceptorProviders} from './api/interceptors';
import {SentryErrorHandler} from './error/sentry.error-handler';
import {AppStoreModule} from './store/app-store.module';

export const DATE_PICKER_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [CommonModule, HttpClientModule, AppStoreModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler,
    },
    httpInterceptorProviders,
    {provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMATS},
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import CoreModule only in the AppModule!');
    }
  }
}
