import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogLayoutModule} from '../../shared/dialog/layout/dialog-layout.module';
import {SkedDialogRoutingModule} from './sked-dialog-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {NewSkedTemplateDialogComponent} from './new-template/new-sked-template-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OphSelectModule} from 'src/app/shared/design/oph-select/oph-select.module';
import {OphFormFieldModule} from 'src/app/shared/design/oph-form-field/oph-form-field.module';
import {OphIconModule} from 'src/app/shared/design/oph-icon/oph-icon.module';
import {SkedTaskListDialogComponent} from './sked-task-list-dialog/sked-task-list-dialog.component';
import {TasksListModule} from 'src/app/shared/tasks/list/tasks-list.module';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [NewSkedTemplateDialogComponent, SkedTaskListDialogComponent],
  imports: [
    CommonModule,
    DialogLayoutModule,
    SkedDialogRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    OphSelectModule,
    OphFormFieldModule,
    OphIconModule,
    TasksListModule,
    PipesModule,
  ],
})
export class SkedDialogModule {}
