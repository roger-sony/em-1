import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SkedsCalendarViewComponent} from './skeds-calendar-view.component';

const routes: Routes = [
  {
    path: '',
    component: SkedsCalendarViewComponent,
    data: {
      bottomNavShown: true,
      mobileSearchShown: true,
      mobileSearchDisabled: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkedsCalendarViewRoutingModule {}
