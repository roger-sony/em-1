import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkedsCalendarViewComponent} from './skeds-calendar-view.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import {SkedsCalendarViewToolbarComponent} from './skeds-calendar-view-toolbar/skeds-calendar-view-toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {OphIconModule} from 'src/app/shared/design/oph-icon/oph-icon.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SkedsCalendarViewRoutingModule} from './skeds-calendar-view-routing.module';
import {SharedLayoutModule} from 'src/app/shared/layout/shared/shared-layout.module';

FullCalendarModule.registerPlugins([interactionPlugin, timeGridWeek]);
@NgModule({
  declarations: [SkedsCalendarViewComponent, SkedsCalendarViewToolbarComponent],
  imports: [
    CommonModule,
    SharedLayoutModule,
    FullCalendarModule,
    MatButtonModule,
    OphIconModule,
    MatTooltipModule,
    SkedsCalendarViewRoutingModule,
  ],
})
export class SkedsCalendarViewModule {}
