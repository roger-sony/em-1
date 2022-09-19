import {NgModule} from '@angular/core';
import {CurrentSkedModule} from '../mobile-sked/current-sked/current-sked.module';
import {MobileSkedModule} from '../mobile-sked/mobile-sked.module';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, MobileSkedModule, CurrentSkedModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
