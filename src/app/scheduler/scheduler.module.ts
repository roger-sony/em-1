import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchedulerComponent} from './scheduler.component';
import {Route, RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';

const routes: Route[] = [
  {
    path: '',
    component: SchedulerComponent,
  },
  {
    path: 'week',
    loadChildren: () => import('./week-view/week-view.module').then(m => m.WeekViewModule),
  },
];

@NgModule({
  declarations: [SchedulerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatIconModule, MatTooltipModule, MatMenuModule],
  exports: [RouterModule],
})
export class SchedulerModule {}
