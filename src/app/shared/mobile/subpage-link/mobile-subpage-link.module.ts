import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {MobileSubpageLinkComponent} from './mobile-subpage-link.component';

@NgModule({
  imports: [CommonModule, OphIconModule],
  declarations: [MobileSubpageLinkComponent],
  exports: [MobileSubpageLinkComponent],
})
export class MobileSubpageLinkModule {}
