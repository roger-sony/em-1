import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkedsSearchPanelModule} from './skeds-search-panel/skeds-search-panel.module';
import {EditSkedDialogModule} from './edit-sked-dialog/edit-sked-dialog.module';

@NgModule({
  imports: [CommonModule, SkedsSearchPanelModule, EditSkedDialogModule],
  exports: [SkedsSearchPanelModule],
})
export class SharedSkedsModule {}
