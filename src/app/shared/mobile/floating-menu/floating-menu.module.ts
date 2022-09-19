import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {FloatingMenuButtonComponent} from './button/floating-menu-button.component';
import {FloatingMenuComponent} from './floating-menu.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, OphIconModule],
  declarations: [FloatingMenuComponent, FloatingMenuButtonComponent],
  exports: [FloatingMenuComponent, FloatingMenuButtonComponent],
})
export class FloatingMenuModule {}
