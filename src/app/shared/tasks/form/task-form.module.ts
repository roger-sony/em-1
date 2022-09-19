import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CadenceFormModule} from 'src/app/dialog/plan/shared/cadence-form/cadence-form.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {PipesModule} from '../../pipes/pipes.module';
import {TaskFormComponent} from './task-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    OphIconModule,
    MatDatepickerModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    PipesModule,
    MatAutocompleteModule,
    CadenceFormModule,
    MatChipsModule,
    MatSelectModule,
  ],
  declarations: [TaskFormComponent],
  exports: [TaskFormComponent],
})
export class TaskFormModule {}
