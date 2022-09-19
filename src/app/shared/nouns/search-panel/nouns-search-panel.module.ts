import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {OphFormFieldModule} from '../../design/oph-form-field/oph-form-field.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {OphInputModule} from '../../design/oph-input/oph-input.module';
import {DesktopSearchPanelModule} from '../../desktop/search-panel/desktop-search-panel.module';
import {NounsSearchPanelComponent} from './nouns-search-panel.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, OphFormFieldModule, OphIconModule, OphInputModule, DesktopSearchPanelModule],
  declarations: [NounsSearchPanelComponent],
  exports: [NounsSearchPanelComponent],
})
export class NounsSearchPanelModule {}
