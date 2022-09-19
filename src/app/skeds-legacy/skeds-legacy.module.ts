import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ActivitySuccessModalComponent} from './current/add-activity-modal/activity-success-modal/activity-success-modal.component';
import {AddActivityModalComponent} from './current/add-activity-modal/add-activity-modal.component';
import {AbandonModalComponent} from './current/begin-task-ph-modal/abandon-modal/abandon-modal.component';
import {BeginTaskPhModalComponent} from './current/begin-task-ph-modal/begin-task-ph-modal.component';
import {SkedDetailComponent} from './current/sked-detail.component';
import {SubmitTaskModalComponent} from './current/submit-task-modal/submit-task-modal.component';
import {SubtaskModalComponent} from './current/subtask-modal/subtask-modal.component';
import {TaskClaimModalComponent} from './current/task-claim-modal/task-claim-modal.component';
import {TaskDetailModalComponent} from './current/task-detail-modal/task-detail-modal.component';
import {SkedsDashboardComponent} from './dashboard/skeds-dashboard.component';
import {SkedInstanceDetailComponent} from './instance-detail/sked-instance-detail.component';
import {SkedsLegacyRoutingModule} from './skeds-legacy-routing.module';
import {SkedTemplateDetailComponent} from './template-detail/sked-template-detail.component';
import {AddTaskShortcutComponent} from './current/add-task-shortcut/add-task-shortcut.component';
import {LoadingModule} from '../shared/design/loading/loading.module';

@NgModule({
  imports: [CommonModule, SharedModule, SkedsLegacyRoutingModule, LoadingModule],
  declarations: [
    SkedDetailComponent,
    SkedsDashboardComponent,
    SkedInstanceDetailComponent,
    SkedTemplateDetailComponent,
    SubtaskModalComponent,
    TaskDetailModalComponent,
    TaskClaimModalComponent,
    BeginTaskPhModalComponent,
    AbandonModalComponent,
    SubmitTaskModalComponent,
    AddActivityModalComponent,
    ActivitySuccessModalComponent,
    AddTaskShortcutComponent,
  ],
})
export class SkedsLegacyModule {}
