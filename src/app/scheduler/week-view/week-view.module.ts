import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeekViewComponent} from './week-view.component';
import {Route, RouterModule} from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {OphFormFieldModule} from '../../shared/design/oph-form-field/oph-form-field.module';
import {OphIconModule} from '../../shared/design/oph-icon/oph-icon.module';
import {MatIconModule} from '@angular/material/icon';
import {OphInputModule} from '../../shared/design/oph-input/oph-input.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FullCalendarModule} from '@fullcalendar/angular';
import timeGridWeek from '@fullcalendar/timegrid';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes: Route[] = [
  {
    path: ':id',
    component: WeekViewComponent,
  },
];

FullCalendarModule.registerPlugins([timeGridWeek]);

@NgModule({
  declarations: [WeekViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    OphFormFieldModule,
    OphIconModule,
    MatIconModule,
    OphInputModule,
    DragDropModule,
    FullCalendarModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [RouterModule],
})
export class WeekViewModule {}
