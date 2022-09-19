import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewPlanHomeComponent} from './home/new-plan-home.component';

const routes: Routes = [
  {
    path: '',
    component: NewPlanHomeComponent,
  },
  {
    path: 'cadence',
    loadChildren: () => import('../cadence/plan-cadence.module').then(m => m.PlanCadenceModule),
  },
  {
    path: 'trigger',
    loadChildren: () => import('../trigger/plan-trigger.module').then(m => m.PlanTriggerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansNewRoutingModule {}
