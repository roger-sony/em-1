import {AddSentenceFormModule} from './../../shared/tasks/add-sentence-form/add-sentence-form.module';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DialogLayoutModule} from '../../shared/dialog/layout/dialog-layout.module';
import {SharedTasksModule} from '../../shared/tasks/shared-tasks.module';
import {NewTaskDialogComponent} from './new-task/new-task-dialog.component';
import {TaskDialogRoutingModule} from './task-dialog-routing.module';
import {EditTaskDialogComponent} from './edit-task/edit-task-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {NewSubtaskDialogComponent} from './new-subtask/new-subtask-dialog.component';
import {EditSubtaskDialogComponent} from './edit-subtask/edit-subtask-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {AddButtonModule} from 'src/app/shared/design/add-button/add-button.module';
import {SubtaskFormModule} from 'src/app/shared/tasks/subtask-form/subtask-form.module';
import {NewRuleTriggerComponent} from './new-rule-trigger/new-rule-trigger.component';
import {EditRuleTriggerComponent} from './edit-rule-trigger/edit-rule-trigger.component';
import {RuleTriggerFormModule} from 'src/app/shared/tasks/rule-trigger-form/rule-trigger-form.module';
import {TaskDetailSubtaskConditionDialogComponent} from './subtask-condition/task-detail-subtask-condition-dialog.component';
import {SubtaskConditionFormModule} from 'src/app/shared/tasks/subtask-condition-form/subtask-condition-form.module';
import {ScheduleTaskDialogComponent} from './schedule-task-dialog/schedule-task-dialog.component';
import {CadenceFormModule} from '../plan/shared/cadence-form/cadence-form.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ScheduleTaskCadenceListComponent} from './schedule-task-dialog/cadence-list/schedule-task-cadence-list.component';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    SharedTasksModule,
    TaskDialogRoutingModule,
    DialogLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    AddButtonModule,
    SubtaskFormModule,
    RuleTriggerFormModule,
    SubtaskConditionFormModule,
    CadenceFormModule,
    MatTooltipModule,
    PipesModule,
    AddSentenceFormModule,
  ],
  declarations: [
    NewTaskDialogComponent,
    EditTaskDialogComponent,
    NewSubtaskDialogComponent,
    EditSubtaskDialogComponent,
    NewRuleTriggerComponent,
    EditRuleTriggerComponent,
    TaskDetailSubtaskConditionDialogComponent,
    ScheduleTaskDialogComponent,
    ScheduleTaskCadenceListComponent,
  ],
})
export class TaskDialogModule {}
