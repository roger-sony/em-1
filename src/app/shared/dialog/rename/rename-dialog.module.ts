import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenameDialogComponent} from './rename-dialog.component';
import {DialogLayoutModule} from '../layout/dialog-layout.module';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [RenameDialogComponent],
  imports: [CommonModule, DialogLayoutModule, MatButtonModule, MatInputModule],
  exports: [RenameDialogComponent],
})
export class RenameDialogModule {}
