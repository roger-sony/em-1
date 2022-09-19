import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewChapterComponent} from './new-chapter.component';
import {MobileHeaderModule} from 'src/app/shared/mobile/header/mobile-header.module';
import {MatButtonModule} from '@angular/material/button';
import {ChapterFormModule} from 'src/app/shared/chapters/chapter-form/chapter-form.module';

@NgModule({
  declarations: [NewChapterComponent],
  imports: [CommonModule, MobileHeaderModule, MatButtonModule, ChapterFormModule],
  exports: [NewChapterComponent],
})
export class NewChapterModule {}
