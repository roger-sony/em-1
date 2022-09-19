import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkedsSearchPanelComponent} from './skeds-search-panel.component';
import {DesktopSearchPanelModule} from '../../desktop/search-panel/desktop-search-panel.module';

@NgModule({
  declarations: [SkedsSearchPanelComponent],
  imports: [CommonModule, DesktopSearchPanelModule],
  exports: [SkedsSearchPanelComponent],
})
export class SkedsSearchPanelModule {}
