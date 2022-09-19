import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubtaskFormComponent} from './old-subtask-form.component';
import {MaterialModule} from '../../material/material.module';
import {AutocompleteModule} from '../../autocomplete/autocomplete.module';
import {PipesModule} from '../../pipes/pipes.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SubtaskFormComponent],
  imports: [CommonModule, MaterialModule, AutocompleteModule, PipesModule, ReactiveFormsModule],
  exports: [SubtaskFormComponent],
})
export class OldSubtaskFormModule {}
