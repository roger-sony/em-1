import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BackButtonModule} from '../../design/back-button/back-button.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {MobileHeaderComponent} from './mobile-header.component';

@NgModule({
  imports: [CommonModule, OphIconModule, BackButtonModule],
  declarations: [MobileHeaderComponent],
  exports: [MobileHeaderComponent],
})
export class MobileHeaderModule {}
