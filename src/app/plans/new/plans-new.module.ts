import {NgModule} from '@angular/core';
import {PlansSharedModule} from '../shared/plans-shared.module';
import {PlansNewHomeModule} from './home/plans-new-home.module';
import {PlansNewRoutingModule} from './plans-new-routing.module';

@NgModule({
  imports: [PlansSharedModule, PlansNewRoutingModule, PlansNewHomeModule],
})
export class PlansNewModule {}
