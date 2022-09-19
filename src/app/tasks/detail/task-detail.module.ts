import {LoadingModule} from './../../shared/design/loading/loading.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskFormModule} from 'src/app/shared/tasks/form/task-form.module';
import {TaskDetailComponent} from './task-detail.component';
import {TaskDetailToolbarComponent} from './toolbar/task-detail-toolbar.component';
import {TaskDetailSubtasksComponent} from './subtasks/task-detail-subtasks.component';
import {MatButtonModule} from '@angular/material/button';
import {DiscardDialogModule} from 'src/app/shared/dialog/discard/discard-dialog.module';
import {BackButtonModule} from 'src/app/shared/design/back-button/back-button.module';
import {SubtaskListComponent} from './subtasks/list/subtask-list.component';
import {AddButtonModule} from 'src/app/shared/design/add-button/add-button.module';
import {TaskDetailRuleTriggersComponent} from './rule-triggers/task-detail-rule-triggers.component';
import {TaskDetailRuleTriggersListComponent} from './rule-triggers/list/task-detail-rule-triggers-list.component';
import {DeleteDialogModule} from 'src/app/shared/dialog/delete/delete-dialog.module';
import {TaskRuleTriggerDeleteDialogComponent} from './rule-triggers/delete-dialog/task-rule-trigger-delete-dialog.component';
import {OphChecklistModule} from 'src/app/shared/design/oph-checklist/oph-checklist.module';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
import {NounDisplayModule} from 'src/app/shared/design/noun-display/noun-display.module';
import {OphMenuModule} from 'src/app/shared/design/oph-menu/oph-menu.module';
import {TaskDetailSubtasksDeleteDialogComponent} from './subtasks/delete-dialog/task-detail-subtasks-delete-dialog.component';
import {ConditionStatementModule} from 'src/app/shared/tasks/condition-statement/condition-statement.module';
import {TaskDetailSubtasksConditionsListComponent} from './subtasks/conditions-list/task-detail-subtasks-conditions-list.component';
import {TaskDetailSubtasksConditionsDeleteDialogComponent} from './subtasks/conditions-list/delete-dialog/task-detail-subtasks-conditions-delete-dialog.component';
import {TasksDetailToolbarMenuComponent} from './toolbar/menu/tasks-detail-toolbar-menu.component';
@NgModule({
  declarations: [
    TaskDetailComponent,
    TaskDetailToolbarComponent,
    TaskDetailSubtasksComponent,
    SubtaskListComponent,
    TaskDetailRuleTriggersComponent,
    TaskDetailRuleTriggersListComponent,
    TaskRuleTriggerDeleteDialogComponent,
    TaskDetailSubtasksDeleteDialogComponent,
    TaskDetailSubtasksConditionsListComponent,
    TaskDetailSubtasksConditionsDeleteDialogComponent,
    TasksDetailToolbarMenuComponent,
  ],
  imports: [
    CommonModule,
    TaskFormModule,
    MatButtonModule,
    DiscardDialogModule,
    BackButtonModule,
    AddButtonModule,
    DeleteDialogModule,
    OphChecklistModule,
    PipesModule,
    NounDisplayModule,
    OphMenuModule,
    ConditionStatementModule,
    LoadingModule,
  ],
  exports: [TaskDetailComponent],
})
export class TaskDetailModule {}
