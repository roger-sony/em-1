// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './environment-type';

let fe_host = window.location.hostname;
let be_host = fe_host.replace('-fe.', '-be.');
let be_api_url = window.location.protocol + '//' + be_host;

export const environment: Environment = {
  production: true,
  envName: 'k8s',
  feedbackWidget: true,
  apiUrl: be_api_url,
  sentryDsn: 'https://77e6c448c8b94fb7a566b346274ad40c@sentry.io/1889782',
  storeDevtools: false,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
