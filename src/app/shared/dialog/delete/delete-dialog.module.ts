import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {DialogLayoutModule} from '../layout/dialog-layout.module';
import {DeleteDialogComponent} from './delete-dialog.component';

@NgModule({
  imports: [CommonModule, DialogLayoutModule, MatButtonModule],
  declarations: [DeleteDialogComponent],
  exports: [DeleteDialogComponent],
})
export class DeleteDialogModule {}
