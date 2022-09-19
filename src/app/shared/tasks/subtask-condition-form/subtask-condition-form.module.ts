import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubtaskConditionFormComponent} from './subtask-condition-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OphSelectModule} from '../../design/oph-select/oph-select.module';
import {PipesModule} from '../../pipes/pipes.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [SubtaskConditionFormComponent],
  imports: [CommonModule, ReactiveFormsModule, OphSelectModule, PipesModule, MatAutocompleteModule],
  exports: [SubtaskConditionFormComponent],
})
export class SubtaskConditionFormModule {}
