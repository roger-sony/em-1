import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SkedDetailComponent} from './current/sked-detail.component';
import {SkedsDashboardComponent} from './dashboard/skeds-dashboard.component';
import {SkedInstanceDetailComponent} from './instance-detail/sked-instance-detail.component';
import {SkedTemplateDetailComponent} from './template-detail/sked-template-detail.component';

const routes: Routes = [
  {path: 'current', component: SkedDetailComponent},
  {path: ':id', component: SkedInstanceDetailComponent},
  {path: 'templates/:displayName', component: SkedTemplateDetailComponent},
  {path: '', component: SkedsDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkedsLegacyRoutingModule {}
