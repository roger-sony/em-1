import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewChapterDialogComponent} from './new-chapter/new-chapter-dialog.component';
import {EditChapterDialogComponent} from './edit-chapter-dialog/edit-chapter-dialog.component';
import {ChapterFormModule} from 'src/app/shared/chapters/chapter-form/chapter-form.module';
import {DialogLayoutModule} from 'src/app/shared/dialog/layout/dialog-layout.module';
import {ChapterDialogRoutingModule} from './chapter-dialog-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {UpdateProgressDialogComponent} from './update-progress-dialog/update-progress-dialog.component';
import {MatSliderModule} from '@angular/material/slider';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [NewChapterDialogComponent, EditChapterDialogComponent, UpdateProgressDialogComponent],
  imports: [
    CommonModule,
    ChapterDialogRoutingModule,
    ChapterFormModule,
    DialogLayoutModule,
    MatButtonModule,
    MatSliderModule,
    ReactiveFormsModule,
  ],
})
export class ChapterDialogModule {}
