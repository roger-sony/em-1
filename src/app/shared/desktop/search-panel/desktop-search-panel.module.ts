import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {OphFormFieldModule} from '../../design/oph-form-field/oph-form-field.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {OphInputModule} from '../../design/oph-input/oph-input.module';
import {OphSelectModule} from '../../design/oph-select/oph-select.module';
import {ChaptersFilterSelectComponent} from './chapters-filter-select/chapters-filter-select.component';
import {DesktopSearchPanelComponent} from './desktop-search-panel.component';
import {DesktopSearchInputComponent} from './search-input/desktop-search-input.component';
import {SortFieldSelectComponent} from './sort-field-select/sort-field-select.component';
import {EmptyToggleComponent} from './empty-toggle/empty-toggle.component';
import {SortDirectionButtonComponent} from './sort-direction-button/sort-direction-button.component';

@NgModule({
  imports: [CommonModule, OphInputModule, OphIconModule, OphFormFieldModule, OphSelectModule, MatSlideToggleModule],
  declarations: [
    ChaptersFilterSelectComponent,
    DesktopSearchInputComponent,
    DesktopSearchPanelComponent,
    SortFieldSelectComponent,
    EmptyToggleComponent,
    SortDirectionButtonComponent,
  ],
  exports: [
    DesktopSearchPanelComponent,
    EmptyToggleComponent,
    DesktopSearchInputComponent,
    SortFieldSelectComponent,
    SortDirectionButtonComponent,
  ],
})
export class DesktopSearchPanelModule {}
