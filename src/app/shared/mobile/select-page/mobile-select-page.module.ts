import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {PipesModule} from '../../pipes/pipes.module';
import {MobileHeaderModule} from '../header/mobile-header.module';
import {MobileSelectPageComponent} from './mobile-select-page.component';
import {MobileSelectOptionComponent} from './option/mobile-select-option.component';

@NgModule({
  imports: [CommonModule, MobileHeaderModule, PipesModule, OphIconModule, MatRippleModule],
  declarations: [MobileSelectPageComponent, MobileSelectOptionComponent],
  exports: [MobileSelectPageComponent, MobileSelectOptionComponent],
})
export class MobileSelectPageModule {}
