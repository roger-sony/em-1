import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {CreateTenantComponent} from './create-tenant/create-tenant.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, AdminRoutingModule],
  declarations: [CreateTenantComponent],
})
export class AdminModule {}
