import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {OphFormFieldModule} from '../oph-form-field/oph-form-field.module';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphInputModule} from '../oph-input/oph-input.module';
import {OphDatePickerComponent} from './oph-date-picker.component';

@NgModule({
  imports: [CommonModule, OphFormFieldModule, OphInputModule, MatDatepickerModule, OphIconModule],
  declarations: [OphDatePickerComponent],
  exports: [OphDatePickerComponent],
})
export class OphDatePickerModule {}
