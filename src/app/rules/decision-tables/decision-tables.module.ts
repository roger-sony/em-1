import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RulesSharedModule} from '../shared/rules-shared.module';
import {DecisionTableDetailComponent} from './detail/decision-table-detail.component';
import {DecisionTablesListComponent} from './list/decision-tables-list.component';

@NgModule({
  imports: [SharedModule, RulesSharedModule],
  declarations: [DecisionTablesListComponent, DecisionTableDetailComponent],
})
export class DecisionTablesModule {}
