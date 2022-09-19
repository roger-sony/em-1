import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanTriggerHomeComponent} from './home/plan-trigger-home.component';
import {PlanTriggerComponent} from './plan-trigger.component';
import {PlanTriggerNounComponent} from './noun/plan-trigger-noun.component';
import {PlanTriggerTaskComponent} from './task/plan-trigger-task.component';
import {PlanTriggerTaskStatusComponent} from './task/status/plan-trigger-task-status.component';

const triggerRoutes: Routes = [
  {
    path: 'noun',
    component: PlanTriggerNounComponent,
  },
  {
    path: 'task',
    component: PlanTriggerTaskComponent,
  },
  {
    path: 'task/status',
    component: PlanTriggerTaskStatusComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: PlanTriggerHomeComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: PlanTriggerComponent,
    children: [
      ...triggerRoutes,
      {
        path: ':triggerId',
        children: [...triggerRoutes],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanTriggerRoutingModule {}
