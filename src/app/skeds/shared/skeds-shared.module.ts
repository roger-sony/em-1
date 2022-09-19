import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkedsNavigationComponent} from './skeds-navigation/skeds-navigation.component';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SkedsNavigationComponent],
  imports: [CommonModule, MatTabsModule, RouterModule],
  exports: [SkedsNavigationComponent],
})
export class SkedsSharedModule {}
