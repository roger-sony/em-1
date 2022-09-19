import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChapterCardModule} from './card/chapter-card.module';
import {CreateChapterButtonComponent} from './create-button/create-chapter-button.component';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateChapterButtonComponent],
  imports: [SharedModule, CommonModule, ChapterCardModule],
  exports: [ChapterCardModule, SharedModule, CreateChapterButtonComponent],
})
export class ChaptersSharedModule {}
