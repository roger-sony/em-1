import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {MobileSaveButtonComponent} from './mobile-save-button.component';

@NgModule({
  imports: [CommonModule, OphIconModule, MatButtonModule],
  declarations: [MobileSaveButtonComponent],
  exports: [MobileSaveButtonComponent],
})
export class MobileSaveButtonModule {}
