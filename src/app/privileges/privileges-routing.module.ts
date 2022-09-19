import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivilegesListComponent} from './list/privileges-list.component';

const routes: Routes = [
  {
    path: '',
    component: PrivilegesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivilegesRoutingModule {}
