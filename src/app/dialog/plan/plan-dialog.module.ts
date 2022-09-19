import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PlansSharedModule} from '../../plans/shared/plans-shared.module';
import {SharedModule} from '../../shared/shared.module';
import {DialogLayoutModule} from '../../shared/dialog/layout/dialog-layout.module';
import {EditTriggerDialogComponent} from './edit-trigger/edit-trigger-dialog.component';
import {NewPlanCadenceStepComponent} from './new-plan/cadence-step/new-plan-cadence-step.component';
import {NewPlanNameStepComponent} from './new-plan/name-step/new-plan-name-step.component';
import {NewPlanDialogComponent} from './new-plan/new-plan-dialog.component';
import {NewPlanDialogDescriptionComponent} from './new-plan/shared/description/new-plan-dialog-description.component';
import {NewPlanDialogFooterComponent} from './new-plan/shared/footer/new-plan-dialog-footer.component';
import {NewPlanProgressIndicatorComponent} from './new-plan/shared/footer/progress-indicator/new-plan-progress-indicator.component';
import {NewPlanTriggerStepComponent} from './new-plan/trigger-step/new-plan-trigger-step.component';
import {NewTriggerDialogComponent} from './new-trigger/new-trigger-dialog.component';
import {PlanDialogRoutingModule} from './plan-dialog-routing.module';
import {PlanPreviewDialogComponent} from './plan-preview/plan-preview-dialog.component';
import {PlanPreviewToolbarComponent} from './plan-preview/plan-preview-toolbar/plan-preview-toolbar.component';
import {SetCadenceDialogComponent} from './set-cadence/set-cadence-dialog.component';
import {PlanDialogSharedModule} from './shared/plan-dialog-shared.module';
import {NewPlanConditionDialogComponent} from './new-condition/new-plan-condition-dialog.component';
import {ConditionFormModule} from 'src/app/plans/shared/condition-form/condition-form.module';
import {EditPlanConditionDialogComponent} from './edit-condition/edit-plan-condition-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DialogLayoutModule,
    PlanDialogRoutingModule,
    PlanDialogSharedModule,
    PlansSharedModule,
    ConditionFormModule,
  ],
  declarations: [
    NewPlanDialogComponent,
    NewPlanDialogFooterComponent,
    NewPlanProgressIndicatorComponent,
    NewPlanCadenceStepComponent,
    NewPlanNameStepComponent,
    NewPlanTriggerStepComponent,
    NewPlanDialogDescriptionComponent,
    NewTriggerDialogComponent,
    EditTriggerDialogComponent,
    SetCadenceDialogComponent,
    PlanPreviewDialogComponent,
    PlanPreviewToolbarComponent,
    NewPlanConditionDialogComponent,
    EditPlanConditionDialogComponent,
  ],
})
export class PlanDialogModule {}
