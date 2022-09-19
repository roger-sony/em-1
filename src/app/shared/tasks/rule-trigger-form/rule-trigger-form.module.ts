import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RuleTriggerFormComponent} from './rule-trigger-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DesignModule} from '../../design/design.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [RuleTriggerFormComponent],
  imports: [CommonModule, ReactiveFormsModule, DesignModule, MatCheckboxModule, MatAutocompleteModule],
  exports: [RuleTriggerFormComponent],
})
export class RuleTriggerFormModule {}
