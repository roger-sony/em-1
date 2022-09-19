import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleDetailComponent} from './detail/role-detail.component';
import {RolesListComponent} from './list/roles-list.component';
import {CanActivateGuard} from '../core/guard/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: RolesListComponent,
  },
  {
    path: ':id',
    component: RoleDetailComponent,
    canLoad: [CanActivateGuard],
    data: {
      privileges: ['Can edit Roles'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
