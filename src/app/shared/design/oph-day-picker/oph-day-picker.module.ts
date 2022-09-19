import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OphDayPickerComponent} from './oph-day-picker.component';
import {OphSelectModule} from '../oph-select/oph-select.module';

@NgModule({
  declarations: [OphDayPickerComponent],
  imports: [CommonModule, OphSelectModule],
  exports: [OphDayPickerComponent],
})
export class OphDayPickerModule {}
