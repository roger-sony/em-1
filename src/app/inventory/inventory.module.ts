import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {InventoryDetailComponent} from './detail/inventory-detail.component';
import {MeasurementSettingsComponent} from './detail/measurement-settings/measurement-settings.component';
import {InventoryRoutingModule} from './inventory-routing.module';
import {InventoryListComponent} from './list/inventory-list.component';

@NgModule({
  imports: [SharedModule, InventoryRoutingModule],
  declarations: [InventoryListComponent, InventoryDetailComponent, MeasurementSettingsComponent],
})
export class InventoryModule {}
