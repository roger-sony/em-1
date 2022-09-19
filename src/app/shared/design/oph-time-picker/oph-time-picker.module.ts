import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {PipesModule} from '../../pipes/pipes.module';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphInputModule} from '../oph-input/oph-input.module';
import {OphTimePickerComponent} from './oph-time-picker.component';

@NgModule({
  imports: [CommonModule, MatAutocompleteModule, OphInputModule, PipesModule, OphIconModule],
  declarations: [OphTimePickerComponent],
  exports: [OphTimePickerComponent],
})
export class OphTimePickerModule {}
