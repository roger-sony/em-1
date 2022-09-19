import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkedTemplateDeleteDialogComponent} from './delete-dialog/sked-template-delete-dialog.component';
import {DeleteDialogModule} from '../../../shared/dialog/delete/delete-dialog.module';
import {SkedTemplateUseDialogComponent} from './use-dialog/sked-template-use-dialog.component';
import {SkedTemplateAbandonDialogComponent} from './abandon-dialog/sked-template-abandon-dialog.component';
import {DialogLayoutModule} from 'src/app/shared/dialog/layout/dialog-layout.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [SkedTemplateDeleteDialogComponent, SkedTemplateUseDialogComponent, SkedTemplateAbandonDialogComponent],
  imports: [CommonModule, DeleteDialogModule, DialogLayoutModule, MatButtonModule],
})
export class SkedTemplatesSharedModule {}
