import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DeleteDialogModule} from '../../dialog/delete/delete-dialog.module';
import {TaskDeleteDialogComponent} from './task-delete-dialog.component';

@NgModule({
  imports: [CommonModule, DeleteDialogModule],
  declarations: [TaskDeleteDialogComponent],
  exports: [TaskDeleteDialogComponent],
})
export class TaskDeleteDialogModule {}
