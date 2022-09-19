import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanDetailPageComponent} from './detail/plan-detail-page.component';
import {PlansMobileSearchOtherComponent} from './list/mobile/search-other/plans-mobile-search-other.component';
import {PlansMobileSearchComponent} from './list/mobile/search/plans-mobile-search.component';
import {PlansListPageComponent} from './list/plans-list-page.component';
import {PlansPreviewMobileComponent} from './preview/plans-preview-mobile.component';
import {NewPlanConditionNounSearchComponent} from './condition-mobile/noun-search/new-plan-condition-noun-search.component';
import {PlanConditionMobileComponent} from './condition-mobile/plan-condition-mobile';

const routes: Routes = [
  {
    path: '',
    component: PlansListPageComponent,
    data: {
      bottomNavShown: true,
      mobileSearchShown: true,
    },
    children: [
      {
        path: 'search/other',
        component: PlansMobileSearchOtherComponent,
      },
      {
        path: 'search',
        component: PlansMobileSearchComponent,
      },
    ],
  },
  {
    path: 'new',
    loadChildren: () => import('./new/plans-new.module').then(m => m.PlansNewModule),
  },
  {
    path: ':planId',
    pathMatch: 'full',
    component: PlanDetailPageComponent,
  },
  {
    path: ':planId',
    children: [
      {
        path: 'cadence',
        loadChildren: () => import('./cadence/plan-cadence.module').then(m => m.PlanCadenceModule),
      },
      {
        path: 'preview',
        component: PlansPreviewMobileComponent,
      },
      {
        path: 'trigger',
        loadChildren: () => import('./trigger/plan-trigger.module').then(m => m.PlanTriggerModule),
      },
      {
        path: 'condition/new',
        component: PlanConditionMobileComponent,
      },
      {
        path: 'condition/new/noun-search',
        component: NewPlanConditionNounSearchComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}
