import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewTaskDialogComponent} from './new-task/new-task-dialog.component';
import {EditTaskDialogComponent} from './edit-task/edit-task-dialog.component';
import {NewSubtaskDialogComponent} from './new-subtask/new-subtask-dialog.component';
import {EditSubtaskDialogComponent} from './edit-subtask/edit-subtask-dialog.component';
import {NewRuleTriggerComponent} from './new-rule-trigger/new-rule-trigger.component';
import {EditRuleTriggerComponent} from './edit-rule-trigger/edit-rule-trigger.component';
import {TaskDetailSubtaskConditionDialogComponent} from './subtask-condition/task-detail-subtask-condition-dialog.component';
import {ScheduleTaskDialogComponent} from './schedule-task-dialog/schedule-task-dialog.component';

const routes: Routes = [
  {
    path: `new`,
    component: NewTaskDialogComponent,
  },
  {
    path: `:taskId`,
    component: EditTaskDialogComponent,
  },
  {
    path: 'sentence/new',
    component: NewSubtaskDialogComponent,
  },
  {
    path: 'sentence/:sentenceIndex',
    component: EditSubtaskDialogComponent,
  },
  {
    path: 'subtask/condition/:factIndex',
    component: TaskDetailSubtaskConditionDialogComponent,
  },
  {
    path: 'ruleTrigger/new',
    component: NewRuleTriggerComponent,
  },
  {
    path: 'ruleTrigger/:ruleTriggerIndex',
    component: EditRuleTriggerComponent,
  },
  {
    path: 'schedule/:paragraphId',
    component: ScheduleTaskDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskDialogRoutingModule {}
