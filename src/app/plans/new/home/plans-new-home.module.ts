import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from '@angular/material/core';
import {PlansSharedModule} from '../../shared/plans-shared.module';
import {RouterModule} from '@angular/router';
import {MobileModule} from 'src/app/shared/mobile/mobile.module';
import {NewPlanHomeComponent} from './new-plan-home.component';
import {NewPlanHomeHeaderComponent} from './header/new-plan-home-header.component';
import {NewPlanNameInputComponent} from './name-input/new-plan-name-input.component';
import {NewPlanSetCadenceComponent} from './set-cadence/new-plan-set-cadence.component';
import {NewPlanAddTriggersComponent} from './add-triggers/new-plan-add-triggers.component';

@NgModule({
  imports: [CommonModule, PlansSharedModule, RouterModule, MobileModule, MatRippleModule],
  declarations: [
    NewPlanHomeComponent,
    NewPlanHomeHeaderComponent,
    NewPlanNameInputComponent,
    NewPlanSetCadenceComponent,
    NewPlanAddTriggersComponent,
  ],
})
export class PlansNewHomeModule {}
