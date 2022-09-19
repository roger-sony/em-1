import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {DialogModule} from './dialog/dialog.module';
import {InventoryValidator} from './inventory/detail/inventory.validator';
import {SharedModule} from './shared/shared.module';
import {AppInitService} from './services/app-init.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AuthModule,
    CoreModule,
    DialogModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    InventoryValidator,
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitService: AppInitService) => async () => await appInitService.initApp(),
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
