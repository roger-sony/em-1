import {NgModule} from '@angular/core';
import {NewChapterDialogComponent} from './new-chapter/new-chapter-dialog.component';
import {RouterModule, Routes} from '@angular/router';
import {EditChapterDialogComponent} from './edit-chapter-dialog/edit-chapter-dialog.component';
import {UpdateProgressDialogComponent} from './update-progress-dialog/update-progress-dialog.component';

const dialogRoutes: Routes = [
  {
    path: 'new',
    component: NewChapterDialogComponent,
  },
  {
    path: ':chapterId/edit',
    component: EditChapterDialogComponent,
  },
  {
    path: ':chapterId/update-progress',
    component: UpdateProgressDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(dialogRoutes)],
  exports: [RouterModule],
})
export class ChapterDialogRoutingModule {}
