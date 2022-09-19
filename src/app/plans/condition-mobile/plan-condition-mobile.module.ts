import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MobileModule} from 'src/app/shared/mobile/mobile.module';
import {NewPlanConditionNounSearchComponent} from './noun-search/new-plan-condition-noun-search.component';
import {PlanConditionMobileComponent} from './plan-condition-mobile';
import {PlansSharedModule} from '../shared/plans-shared.module';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PlanConditionMobileComponent, NewPlanConditionNounSearchComponent],
  imports: [CommonModule, MobileModule, PlansSharedModule, SharedModule],
})
export class PlanConditionMobileModule {}
