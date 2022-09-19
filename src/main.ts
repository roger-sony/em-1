import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment.feedbackWidget) {
  const script = document.createElement('script');
  script.src = 'https://desk.zoho.com/portal/api/feedbackwidget/413225000000285273?orgId=693149925&displayType=popout';
  document.body.appendChild(script);
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
