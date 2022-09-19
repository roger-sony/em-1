import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MetricsRoutingModule} from './metrics-routing.module';
import {MetricsComponent} from './metrics.component';

@NgModule({
  imports: [SharedModule, MetricsRoutingModule],
  declarations: [MetricsComponent],
})
export class MetricsModule {}
