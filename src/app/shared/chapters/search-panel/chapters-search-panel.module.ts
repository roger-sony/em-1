import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChaptersSearchPanelComponent} from './chapters-search-panel.component';
import {MatButtonModule} from '@angular/material/button';
import {OphFormFieldModule} from '../../design/oph-form-field/oph-form-field.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {OphInputModule} from '../../design/oph-input/oph-input.module';
import {DesktopSearchPanelModule} from '../../desktop/search-panel/desktop-search-panel.module';

@NgModule({
  declarations: [ChaptersSearchPanelComponent],
  imports: [CommonModule, MatButtonModule, OphFormFieldModule, OphIconModule, OphInputModule, DesktopSearchPanelModule],
  exports: [ChaptersSearchPanelComponent],
})
export class ChaptersSearchPanelModule {}
