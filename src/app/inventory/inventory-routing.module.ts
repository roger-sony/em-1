import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InventoryDetailComponent} from './detail/inventory-detail.component';
import {InventoryListComponent} from './list/inventory-list.component';

const routes: Routes = [
  {
    path: ':id',
    component: InventoryDetailComponent,
    data: {
      bottomNavShown: true,
      mobileSearchShown: true,
      mobileSearchDisabled: true,
    },
  },
  {
    path: '',
    component: InventoryListComponent,
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
export class InventoryRoutingModule {}
