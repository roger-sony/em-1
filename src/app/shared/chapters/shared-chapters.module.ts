import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddToChapterModule} from './add-to-chapter/add-to-chapter.module';
import {ChapterChipsModule} from './chapter-chips/chapter-chips.module';
import {ChaptersSearchPanelModule} from './search-panel/chapters-search-panel.module';

@NgModule({
  imports: [CommonModule, AddToChapterModule, ChapterChipsModule, ChaptersSearchPanelModule],
  exports: [ChaptersSearchPanelModule],
})
export class SharedChaptersModule {}
