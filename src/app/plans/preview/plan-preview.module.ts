import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MobileHeaderModule} from '../../shared/mobile/header/mobile-header.module';
import {SharedModule} from '../../shared/shared.module';
import {PlansPreviewMobileMenuComponent} from './menu/plans-preview-mobile-menu.component';
import {PlansPreviewMobileComponent} from './plans-preview-mobile.component';

@NgModule({
  imports: [CommonModule, MobileHeaderModule, SharedModule],
  declarations: [PlansPreviewMobileComponent, PlansPreviewMobileMenuComponent],
})
export class PlanPreviewModule {}
