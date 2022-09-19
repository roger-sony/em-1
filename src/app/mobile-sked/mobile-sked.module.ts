import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {CanDeactivateGuard} from '../services/can-deactivate.guard';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'current-sked',
        loadChildren: () => import('./current-sked/current-sked.module').then(m => m.CurrentSkedModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard],
})
export class MobileSkedModule {}
