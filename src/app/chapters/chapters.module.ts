import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChaptersRoutingModule} from './chapters-routing.module';
import {ChapterDetailModule} from './detail/chapter-detail.module';
import {ChaptersListModule} from './list/chapters-list.module';
import {NewChapterModule} from './new/new-chapter.module';

@NgModule({
  imports: [CommonModule, ChapterDetailModule, ChaptersListModule, ChaptersRoutingModule, NewChapterModule],
})
export class ChaptersModule {}
