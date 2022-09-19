import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {OphFormFieldModule} from '../oph-form-field/oph-form-field.module';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphOptionComponent} from './oph-option/oph-option.component';
import {OphSelectComponent} from './oph-select.component';

@NgModule({
  imports: [CommonModule, OphFormFieldModule, OphIconModule, MatCheckboxModule],
  declarations: [OphSelectComponent, OphOptionComponent],
  exports: [OphSelectComponent, OphOptionComponent],
})
export class OphSelectModule {}
