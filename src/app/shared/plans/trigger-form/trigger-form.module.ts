import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DesignModule} from '../../design/design.module';
import {NounTriggerFormComponent} from './noun/noun-trigger-form.component';
import {TaskTriggerFormComponent} from './task/task-trigger-form.component';
import {TriggerFormComponent} from './trigger-form.component';
import {TriggerTypeButtonComponent} from './type-button/trigger-type-button.component';
import {AddMenuModule} from '../../desktop/add-menu/add-menu.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, DesignModule, MatCheckboxModule, MatAutocompleteModule, AddMenuModule],
  declarations: [TriggerFormComponent, NounTriggerFormComponent, TaskTriggerFormComponent, TriggerTypeButtonComponent],
  exports: [TriggerFormComponent],
})
export class TriggerFormModule {}
