import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MobileModule} from 'src/app/shared/mobile/mobile.module';
import {PlansSharedModule} from '../shared/plans-shared.module';
import {PlanTriggerHomeComponent} from './home/plan-trigger-home.component';
import {PlanTriggerComponent} from './plan-trigger.component';
import {PlanTriggerNounComponent} from './noun/plan-trigger-noun.component';
import {PlanTriggerRoutingModule} from './plan-trigger-routing.module';
import {PlanTriggerTaskComponent} from './task/plan-trigger-task.component';
import {PlanTriggerTaskStatusComponent} from './task/status/plan-trigger-task-status.component';

@NgModule({
  imports: [CommonModule, MobileModule, PlansSharedModule, PlanTriggerRoutingModule],
  declarations: [
    PlanTriggerComponent,
    PlanTriggerHomeComponent,
    PlanTriggerNounComponent,
    PlanTriggerTaskComponent,
    PlanTriggerTaskStatusComponent,
  ],
})
export class PlanTriggerModule {}
