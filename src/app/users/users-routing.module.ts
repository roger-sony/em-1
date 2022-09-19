import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailComponent} from './detail/user-detail.component';
import {UsersListComponent} from './list/users-list.component';
import {CanActivateGuard} from '../core/guard/can-activate.guard';

const routes: Routes = [
  {path: '', component: UsersListComponent},
  {
    path: ':id',
    component: UserDetailComponent,
    canLoad: [CanActivateGuard],
    data: {
      privileges: ['Can edit Users'],
    },
  },
  {path: 'roles', pathMatch: 'full', redirectTo: ''},
  {path: 'privileges', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
