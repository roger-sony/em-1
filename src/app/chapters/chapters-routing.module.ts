import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChapterDetailComponent} from './detail/chapter-detail.component';
import {ChapterNounsComponent} from './detail/nouns/chapter-nouns.component';
import {ChapterOverviewComponent} from './detail/overview/chapter-overview.component';
import {ChapterPlansComponent} from './detail/plans/chapter-plans.component';
import {ChapterTasksComponent} from './detail/tasks/chapter-tasks.component';
import {ChaptersListComponent} from './list/chapters-list.component';
import {NewChapterComponent} from './new/new-chapter.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewChapterComponent,
  },
  {
    path: ':chapterId',
    component: ChapterDetailComponent,
    children: [
      {
        path: 'overview',
        component: ChapterOverviewComponent,
      },
      {
        path: 'plans',
        component: ChapterPlansComponent,
      },
      {
        path: 'tasks',
        component: ChapterTasksComponent,
      },
      {
        path: 'nouns',
        component: ChapterNounsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: ChaptersListComponent,
    data: {
      bottomNavShown: true,
      mobileSearchShown: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChaptersRoutingModule {}
