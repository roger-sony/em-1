import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FloatingMenuModule} from './floating-menu/floating-menu.module';
import {MobileHeaderModule} from './header/mobile-header.module';
import {MobileListPickerModule} from './list-picker/mobile-list-picker.module';
import {MobileSaveButtonModule} from './save-button/mobile-save-button.module';
import {MobileSearchPageModule} from './search-page/mobile-search-page.module';
import {MobileSelectPageModule} from './select-page/mobile-select-page.module';
import {MobileSetButtonModule} from './set-button/mobile-set-button.module';
import {MobileSubpageLinkModule} from './subpage-link/mobile-subpage-link.module';
import {MobileTimePickerModule} from './time-picker/mobile-time-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FloatingMenuModule,
    MobileHeaderModule,
    MobileSearchPageModule,
    MobileSelectPageModule,
    MobileSetButtonModule,
    MobileListPickerModule,
    MobileSaveButtonModule,
    MobileSearchPageModule,
    MobileSelectPageModule,
    MobileSubpageLinkModule,
    MobileTimePickerModule,
  ],
  exports: [
    FloatingMenuModule,
    MobileHeaderModule,
    MobileSearchPageModule,
    MobileSelectPageModule,
    MobileSetButtonModule,
    MobileListPickerModule,
    MobileSaveButtonModule,
    MobileSearchPageModule,
    MobileSelectPageModule,
    MobileSubpageLinkModule,
    MobileTimePickerModule,
  ],
})
export class MobileModule {}
