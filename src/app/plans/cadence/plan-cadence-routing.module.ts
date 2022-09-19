import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanCadenceCustomMonthlyComponent} from './custom/monthly/plan-cadence-custom-monthly.component';
import {PlanCadenceCustomComponent} from './custom/plan-cadence-custom.component';
import {PlanCadenceCustomWeeklyComponent} from './custom/weekly/plan-cadence-custom-weekly.component';
import {PlanCadenceEndComponent} from './end/plan-cadence-end.component';
import {PlanCadenceHomeComponent} from './home/plan-cadence-home.component';
import {PlanCadenceComponent} from './plan-cadence.component';
import {PlanCadenceRepetitionComponent} from './repetition/plan-cadence-repetition.component';

const cadenceRoutes: Routes = [
  {
    path: 'end',
    component: PlanCadenceEndComponent,
  },
  {
    path: 'repetition',
    children: [
      {
        path: 'custom',
        children: [
          {
            path: 'monthly',
            component: PlanCadenceCustomMonthlyComponent,
          },
          {
            path: 'weekly',
            component: PlanCadenceCustomWeeklyComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            component: PlanCadenceCustomComponent,
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        component: PlanCadenceRepetitionComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: PlanCadenceHomeComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: PlanCadenceComponent,
    children: [
      ...cadenceRoutes,
      {
        path: ':cadenceId',
        children: [...cadenceRoutes],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanCadenceRoutingModule {}
