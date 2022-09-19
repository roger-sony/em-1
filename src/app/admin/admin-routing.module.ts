import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTenantComponent} from './create-tenant/create-tenant.component';

const routes: Routes = [{path: 'create-tenant', component: CreateTenantComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
