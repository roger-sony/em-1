import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MobileSetButtonComponent} from './mobile-set-button.component';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';

@NgModule({
  imports: [CommonModule, OphIconModule],
  declarations: [MobileSetButtonComponent],
  exports: [MobileSetButtonComponent],
})
export class MobileSetButtonModule {}
