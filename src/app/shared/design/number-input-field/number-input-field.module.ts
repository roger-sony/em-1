import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {OphFormFieldModule} from '../oph-form-field/oph-form-field.module';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphInputModule} from '../oph-input/oph-input.module';
import {NumberInputFieldComponent} from './number-input-field.component';

@NgModule({
  imports: [CommonModule, OphIconModule, OphFormFieldModule, OphInputModule, ReactiveFormsModule],
  declarations: [NumberInputFieldComponent],
  exports: [NumberInputFieldComponent],
})
export class NumberInputFieldModule {}
