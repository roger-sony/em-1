import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PlanDetailModule} from './detail/plan-detail.module';
import {PlansListModule} from './list/plans-list.module';
import {PlansRoutingModule} from './plans-routing.module';
import {PlanPreviewModule} from './preview/plan-preview.module';
import {MobileModule} from '../shared/mobile/mobile.module';
import {PlanConditionMobileModule} from './condition-mobile/plan-condition-mobile.module';

@NgModule({
  imports: [
    CommonModule,
    PlanDetailModule,
    PlansListModule,
    PlanPreviewModule,
    PlansRoutingModule,
    MobileModule,
    PlanConditionMobileModule,
  ],
})
export class PlansModule {}
