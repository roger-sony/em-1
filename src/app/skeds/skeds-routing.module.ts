import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SkedsCalendarViewComponent} from './calendar-view/skeds-calendar-view.component';
import {SkedsComponent} from './skeds.component';
import {SkedTemplateDetailComponent} from './templates/detail/sked-template-detail.component';
import {SkedTemplatesListComponent} from './templates/list/sked-templates-list.component';

const routes: Routes = [
  {
    path: '',
    component: SkedsComponent,
    data: {
      bottomNavShown: true,
      mobileSearchShown: true,
      mobileSearchDisabled: true,
    },
    children: [
      {
        path: 'current',
        loadChildren: () => import('../mobile-sked/current-sked/current-sked.module').then(m => m.CurrentSkedModule),
      },
      {
        path: 'calendar',
        component: SkedsCalendarViewComponent,
      },
      {
        path: 'templates',
        component: SkedTemplatesListComponent,
      },
      {
        path: 'templates/new',
        component: SkedTemplateDetailComponent,
      },
      {
        path: 'templates/:templateId',
        component: SkedTemplateDetailComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'current',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkedsRoutingModule {}
