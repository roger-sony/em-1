import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NounDeleteDialogComponent} from './noun-delete-dialog.component';
import {DeleteDialogModule} from '../../dialog/delete/delete-dialog.module';

@NgModule({
  imports: [CommonModule, DeleteDialogModule],
  declarations: [NounDeleteDialogComponent],
  exports: [NounDeleteDialogComponent],
})
export class NounDeleteDialogModule {}
