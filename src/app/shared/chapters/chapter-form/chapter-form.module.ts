import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChapterFormComponent} from './chapter-form.component';
import {DialogLayoutModule} from '../../dialog/layout/dialog-layout.module';
import {MatButtonModule} from '@angular/material/button';
import {ChapterDetailSharedModule} from 'src/app/chapters/detail/shared/chapter-detail-shared.module';
import {ChaptersSharedModule} from 'src/app/chapters/shared/chapters-shared.module';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [ChapterFormComponent],
  imports: [
    CommonModule,
    DialogLayoutModule,
    MatButtonModule,
    ChapterDetailSharedModule,
    ChaptersSharedModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    OphIconModule,
    PipesModule,
  ],
  exports: [ChapterFormComponent],
})
export class ChapterFormModule {}
