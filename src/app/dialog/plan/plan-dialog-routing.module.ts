import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditTriggerDialogComponent} from './edit-trigger/edit-trigger-dialog.component';
import {NewPlanCadenceStepComponent} from './new-plan/cadence-step/new-plan-cadence-step.component';
import {NewPlanNameStepComponent} from './new-plan/name-step/new-plan-name-step.component';
import {NewPlanDialogComponent} from './new-plan/new-plan-dialog.component';
import {NewPlanTriggerStepComponent} from './new-plan/trigger-step/new-plan-trigger-step.component';
import {NewTriggerDialogComponent} from './new-trigger/new-trigger-dialog.component';
import {SetCadenceDialogComponent} from './set-cadence/set-cadence-dialog.component';
import {PlanPreviewDialogComponent} from './plan-preview/plan-preview-dialog.component';
import {NewPlanConditionDialogComponent} from './new-condition/new-plan-condition-dialog.component';
import {EditPlanConditionDialogComponent} from './edit-condition/edit-plan-condition-dialog.component';

const dialogRoutes: Routes = [
  {
    path: `new`,
    component: NewPlanDialogComponent,
    children: [
      {
        path: 'name',
        component: NewPlanNameStepComponent,
      },
      {
        path: 'cadence',
        component: NewPlanCadenceStepComponent,
      },
      {
        path: 'trigger',
        component: NewPlanTriggerStepComponent,
      },
      {
        path: '',
        redirectTo: 'name',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ':cadencePlanId/cadence',
    children: [
      {
        path: ':cadenceId',
        component: SetCadenceDialogComponent,
      },
      {
        path: '',
        component: SetCadenceDialogComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ':triggerPlanId/trigger',
    children: [
      {path: 'new', component: NewTriggerDialogComponent},
      {path: ':triggerId/:triggerType', component: EditTriggerDialogComponent},
      {path: '', redirectTo: 'new', pathMatch: 'full'},
    ],
  },
  {
    path: ':previewPlanId/preview',
    component: PlanPreviewDialogComponent,
  },
  {
    path: 'new-condition',
    component: NewPlanConditionDialogComponent,
  },
  {
    path: 'edit-condition/:conditionId',
    component: EditPlanConditionDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(dialogRoutes)],
  exports: [RouterModule],
})
export class PlanDialogRoutingModule {}
