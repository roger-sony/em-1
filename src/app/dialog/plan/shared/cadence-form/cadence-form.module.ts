import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {DesignModule} from '../../../../shared/design/design.module';
import {OphTimePickerModule} from '../../../../shared/design/oph-time-picker/oph-time-picker.module';
import {PipesModule} from '../../../../shared/pipes/pipes.module';
import {CadenceFormComponent} from './cadence-form.component';
import {CustomCadenceFormComponent} from './custom/custom-cadence-form.component';
import {CadenceEndFormComponent} from './end/cadence-end-form.component';

@NgModule({
  imports: [
    CommonModule,
    DesignModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    PipesModule,
    MatAutocompleteModule,
    MatSelectModule,
    OphTimePickerModule,
    MatButtonModule,
  ],
  declarations: [CadenceFormComponent, CustomCadenceFormComponent, CadenceEndFormComponent],
  exports: [CadenceFormComponent],
})
export class CadenceFormModule {}
