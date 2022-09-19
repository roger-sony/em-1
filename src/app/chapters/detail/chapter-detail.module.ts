import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MobileHeaderModule} from '../../shared/mobile/header/mobile-header.module';
import {ChapterDetailComponent} from './chapter-detail.component';
import {ChapterNounsModule} from './nouns/chapter-nouns.module';
import {ChapterOverviewModule} from './overview/chapter-overview.module';
import {ChapterPlansModule} from './plans/chapter-plans.module';
import {ChapterDetailSharedModule} from './shared/chapter-detail-shared.module';
import {ChapterTasksModule} from './tasks/chapter-tasks.module';

@NgModule({
  imports: [
    CommonModule,
    ChapterDetailSharedModule,
    ChapterOverviewModule,
    ChapterNounsModule,
    ChapterPlansModule,
    ChapterTasksModule,
    MobileHeaderModule,
    RouterModule,
  ],
  declarations: [ChapterDetailComponent],
})
export class ChapterDetailModule {}
