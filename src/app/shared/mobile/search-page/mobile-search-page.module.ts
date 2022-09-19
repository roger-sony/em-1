import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {MobileHeaderModule} from '../header/mobile-header.module';
import {MobileSearchPageClearButtonComponent} from './clear-button/mobile-search-page-clear-button.component';
import {MobileSearchPageEmptyComponent} from './empty/mobile-search-page-empty.component';
import {MobileSearchPageInputComponent} from './input/mobile-search-page-input.component';
import {MobileSearchPageItemComponent} from './item/mobile-search-page-item.component';
import {MobileSearchPageComponent} from './mobile-search-page.component';

@NgModule({
  imports: [CommonModule, MobileHeaderModule, OphIconModule, MatRippleModule],
  declarations: [
    MobileSearchPageComponent,
    MobileSearchPageInputComponent,
    MobileSearchPageClearButtonComponent,
    MobileSearchPageItemComponent,
    MobileSearchPageEmptyComponent,
  ],
  exports: [MobileSearchPageComponent],
})
export class MobileSearchPageModule {}
