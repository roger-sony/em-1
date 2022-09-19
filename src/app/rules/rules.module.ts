import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DecisionTablesModule} from './decision-tables/decision-tables.module';
import {RulesRoutingModule} from './rules-routing.module';
import {RuleTriggersModule} from './triggers/rule-triggers.module';

@NgModule({
  imports: [DecisionTablesModule, RuleTriggersModule, RulesRoutingModule, SharedModule],
})
export class RulesModule {}
