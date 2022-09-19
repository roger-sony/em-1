import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DecisionTableDetailComponent} from './decision-tables/detail/decision-table-detail.component';
import {DecisionTablesListComponent} from './decision-tables/list/decision-tables-list.component';
import {NounTriggerFormComponent} from './triggers/detail/noun-trigger-form/noun-trigger-form.component';
import {OneTimeTriggerFormComponent} from './triggers/detail/one-time-trigger-form/one-time-trigger-form.component';
import {RuleTriggerDetailComponent} from './triggers/detail/rule-trigger-detail.component';
import {ScheduleTriggerFormComponent} from './triggers/detail/schedule-trigger-form/schedule-trigger-form.component';
import {TaskTriggerFormComponent} from './triggers/detail/task-trigger-form/task-trigger-form.component';
import {RuleTriggersListComponent} from './triggers/list/rule-triggers-list.component';

const routes: Routes = [
  {
    path: 'rule-triggers',
    children: [
      {path: 'noun/:id', component: NounTriggerFormComponent},
      {path: 'one-time/:id', component: OneTimeTriggerFormComponent},
      {path: 'schedule/:id', component: ScheduleTriggerFormComponent},
      {path: 'task/:id', component: TaskTriggerFormComponent},
      {path: ':id', component: RuleTriggerDetailComponent},
      {path: '', component: RuleTriggersListComponent},
    ],
  },
  {path: ':id', component: DecisionTableDetailComponent},
  {path: '', component: DecisionTablesListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesRoutingModule {}
