import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NavbarModule} from '../navbar/navbar.module';
import {DesktopLayoutModule} from './desktop/desktop-layout.module';
import {MobileLayoutModule} from './mobile/mobile-layout.module';
import {PageWrapperComponent} from './page-wrapper.component';

@NgModule({
  imports: [DesktopLayoutModule, MobileLayoutModule, CommonModule, NavbarModule],
  declarations: [PageWrapperComponent],
  exports: [PageWrapperComponent],
})
export class LayoutModule {}
