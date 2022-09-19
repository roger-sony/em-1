import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {BackButtonComponent} from './back-button.component';

@NgModule({
  imports: [CommonModule, OphIconModule],
  declarations: [BackButtonComponent],
  exports: [BackButtonComponent],
})
export class BackButtonModule {}
