import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DecisionTableReportsComponent} from './decision-table/decision-table-reports.component';
import {DecisionTableReportDetailComponent} from './decision-table/detail/decision-table-report-detail.component';
import {ReportsAccordionComponent} from './decision-table/reports-accordion/reports-accordion.component';
import {QueuedActionsComponent} from './queued-actions/queued-actions.component';
import {ReportsRoutingModule} from './reports-routing.module';

@NgModule({
  imports: [SharedModule, ReportsRoutingModule],
  declarations: [
    DecisionTableReportsComponent,
    DecisionTableReportDetailComponent,
    QueuedActionsComponent,
    ReportsAccordionComponent,
  ],
})
export class ReportsModule {}
