import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DecisionTableReportsComponent} from './decision-table/decision-table-reports.component';
import {DecisionTableReportDetailComponent} from './decision-table/detail/decision-table-report-detail.component';
import {QueuedActionsComponent} from './queued-actions/queued-actions.component';

const routes: Routes = [
  {path: 'decision-tables', component: DecisionTableReportsComponent},
  {path: 'decision-tables/:id', component: DecisionTableReportDetailComponent},
  {path: 'queued-actions', component: QueuedActionsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'decision-tables'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
