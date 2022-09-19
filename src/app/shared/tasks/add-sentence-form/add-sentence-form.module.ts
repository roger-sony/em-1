import {MatButtonModule} from '@angular/material/button';
import {SubtaskConditionFormModule} from 'src/app/shared/tasks/subtask-condition-form/subtask-condition-form.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
import {OphFormFieldModule} from 'src/app/shared/design/oph-form-field/oph-form-field.module';
import {OphSelectModule} from 'src/app/shared/design/oph-select/oph-select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AddButtonModule} from 'src/app/shared/design/add-button/add-button.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddSentenceFormComponent} from './add-sentence-form.component';

@NgModule({
  declarations: [AddSentenceFormComponent],
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
  exports: [AddSentenceFormComponent],
})
export class AddSentenceFormModule {}
