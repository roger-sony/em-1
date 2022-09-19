import {NgModule} from '@angular/core';
import {DeleteDialogModule} from './delete/delete-dialog.module';
import {DialogLayoutModule} from './layout/dialog-layout.module';
import {RenameDialogModule} from './rename/rename-dialog.module';

@NgModule({
  imports: [DeleteDialogModule, DialogLayoutModule, RenameDialogModule],
})
export class SharedDialogModule {}
