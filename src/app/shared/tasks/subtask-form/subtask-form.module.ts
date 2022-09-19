import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubtaskFormComponent} from './subtask-form.component';
import {AddButtonModule} from '../../design/add-button/add-button.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {OphSelectModule} from '../../design/oph-select/oph-select.module';
import {OphFormFieldModule} from '../../design/oph-form-field/oph-form-field.module';
import {PipesModule} from '../../pipes/pipes.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SubtaskConditionFormModule} from '../subtask-condition-form/subtask-condition-form.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [SubtaskFormComponent],
  imports: [
    CommonModule,
    AddButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    OphSelectModule,
    OphFormFieldModule,
    PipesModule,
    MatAutocompleteModule,
    SubtaskConditionFormModule,
    MatButtonModule,
  ],
  exports: [SubtaskFormComponent],
})
export class SubtaskFormModule {}
