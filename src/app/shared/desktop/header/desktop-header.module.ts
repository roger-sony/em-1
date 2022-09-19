import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BackButtonModule} from '../../design/back-button/back-button.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {DesktopHeaderButtonComponent} from './button/desktop-header-button.component';
import {DesktopHeaderComponent} from './desktop-header.component';

@NgModule({
  imports: [CommonModule, BackButtonModule, OphIconModule],
  declarations: [DesktopHeaderComponent, DesktopHeaderButtonComponent],
  exports: [DesktopHeaderComponent, DesktopHeaderButtonComponent],
})
export class DesktopHeaderModule {}
