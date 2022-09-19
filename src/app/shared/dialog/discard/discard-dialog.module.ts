import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscardDialogComponent} from './discard-dialog.component';
import {DialogLayoutModule} from '../layout/dialog-layout.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [DiscardDialogComponent],
  imports: [CommonModule, DialogLayoutModule, MatButtonModule],
  exports: [DiscardDialogComponent],
})
export class DiscardDialogModule {}
