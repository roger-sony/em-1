import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OphFormFieldComponent} from './oph-form-field.component';
import {OphLabelComponent} from './oph-label/oph-label.component';
import {OphErrorComponent} from './oph-error/oph-error.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OphFormFieldComponent, OphLabelComponent, OphErrorComponent],
  exports: [OphFormFieldComponent, OphLabelComponent, OphErrorComponent],
})
export class OphFormFieldModule {}
