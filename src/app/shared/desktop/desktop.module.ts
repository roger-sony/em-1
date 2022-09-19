import {NgModule} from '@angular/core';
import {DesktopHeaderModule} from './header/desktop-header.module';
import {DesktopToolbarModule} from './toolbar/desktop-toolbar.module';

@NgModule({
  imports: [DesktopHeaderModule, DesktopToolbarModule],
  exports: [DesktopHeaderModule, DesktopToolbarModule],
})
export class DesktopModule {}
