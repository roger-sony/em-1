import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlansSearchPanelComponent} from './plans-search-panel.component';
import {MatButtonModule} from '@angular/material/button';
import {OphFormFieldModule} from '../../design/oph-form-field/oph-form-field.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {OphInputModule} from '../../design/oph-input/oph-input.module';
import {DesktopSearchPanelModule} from '../../desktop/search-panel/desktop-search-panel.module';

@NgModule({
  declarations: [PlansSearchPanelComponent],
  imports: [CommonModule, MatButtonModule, OphFormFieldModule, OphIconModule, OphInputModule, DesktopSearchPanelModule],
  exports: [PlansSearchPanelComponent],
})
export class PlansSearchPanelModule {}
