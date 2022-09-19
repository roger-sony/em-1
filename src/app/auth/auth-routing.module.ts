import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CanActivateGuard} from '../core/guard/can-activate.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
