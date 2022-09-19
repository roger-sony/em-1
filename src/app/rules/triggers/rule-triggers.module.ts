import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RulesSharedModule} from '../shared/rules-shared.module';
import {NounTriggerFormComponent} from './detail/noun-trigger-form/noun-trigger-form.component';
import {OneTimeTriggerFormComponent} from './detail/one-time-trigger-form/one-time-trigger-form.component';
import {RuleTriggerDetailComponent} from './detail/rule-trigger-detail.component';
import {CronGeneratorComponent} from './detail/schedule-trigger-form/cron-generator/cron-generator.component';
import {ScheduleTriggerFormComponent} from './detail/schedule-trigger-form/schedule-trigger-form.component';
import {TaskTriggerFormComponent} from './detail/task-trigger-form/task-trigger-form.component';
import {RuleTriggersListComponent} from './list/rule-triggers-list.component';

@NgModule({
  imports: [SharedModule, RulesSharedModule],
  declarations: [
    RuleTriggersListComponent,
    RuleTriggerDetailComponent,
    TaskTriggerFormComponent,
    NounTriggerFormComponent,
    OneTimeTriggerFormComponent,
    ScheduleTriggerFormComponent,
    CronGeneratorComponent,
  ],
})
export class RuleTriggersModule {}
