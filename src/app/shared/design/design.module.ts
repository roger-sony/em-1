import {NgModule} from '@angular/core';
import {DaysOfWeekSelectModule} from './days-of-week-select/days-of-week-select.module';
import {NumberInputFieldModule} from './number-input-field/number-input-field.module';
import {OphCardModule} from './oph-card/oph-card.module';
import {OphDatePickerModule} from './oph-date-picker/oph-date-picker.module';
import {OphFormFieldModule} from './oph-form-field/oph-form-field.module';
import {OphIconModule} from './oph-icon/oph-icon.module';
import {OphInputModule} from './oph-input/oph-input.module';
import {OphMenuModule} from './oph-menu/oph-menu.module';
import {OphSelectModule} from './oph-select/oph-select.module';
import {SearchBoxModule} from './search-box/search-box.module';

@NgModule({
  imports: [
    DaysOfWeekSelectModule,
    NumberInputFieldModule,
    OphCardModule,
    OphDatePickerModule,
    OphFormFieldModule,
    OphIconModule,
    OphInputModule,
    OphMenuModule,
    OphSelectModule,
    SearchBoxModule,
  ],
  exports: [
    DaysOfWeekSelectModule,
    NumberInputFieldModule,
    OphCardModule,
    OphDatePickerModule,
    OphFormFieldModule,
    OphIconModule,
    OphInputModule,
    OphMenuModule,
    OphSelectModule,
    SearchBoxModule,
  ],
})
export class DesignModule {}
