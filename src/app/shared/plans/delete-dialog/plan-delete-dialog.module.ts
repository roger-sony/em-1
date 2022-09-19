import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteDialogModule} from '../../dialog/delete/delete-dialog.module';
import {PlanDeleteDialogComponent} from './plan-delete-dialog.component';

@NgModule({
  imports: [CommonModule, DeleteDialogModule],
  declarations: [PlanDeleteDialogComponent],
  exports: [PlanDeleteDialogComponent],
})
export class PlanDeleteDialogModule {}
