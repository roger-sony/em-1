// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './environment-type';

export const environment: Environment = {
  production: false,
  /* Connect to QA Node Server */
  apiUrl: 'https://ophanim-api-dev.timbergrove.com',
  // apiUrl: 'http://ophanim-dev.timbergrove.com:3000',
  /* Connect to a locally running Node Server */
  // apiUrl: `${window.location.protocol}//${window.location.hostname}:3000`
  envName: 'localhost',
  feedbackWidget: false,
  sentryDsn: '', // do not send errors from localhost
  storeDevtools: true,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
