import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkedsRoutingModule} from './skeds-routing.module';
import {SkedsComponent} from './skeds.component';
import {SkedsSharedModule} from './shared/skeds-shared.module';
import {SkedsCalendarViewModule} from './calendar-view/skeds-calendar-view.module';
import {CurrentSkedModule} from './current-sked/current-sked.module';
import {SkedTemplatesModule} from './templates/sked-templates.module';
import {CanDeactivateGuard} from '../services/can-deactivate.guard';

@NgModule({
  declarations: [SkedsComponent],
  imports: [
    CommonModule,
    SkedsRoutingModule,
    SkedsSharedModule,
    SkedsCalendarViewModule,
    CurrentSkedModule,
    SkedTemplatesModule,
  ],
  providers: [CanDeactivateGuard],
})
export class SkedsModule {}
