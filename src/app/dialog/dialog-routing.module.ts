import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {DialogLoadingComponent} from './dialog-loading.component';

const routes: Routes = [
  {
    path: 'plan',
    outlet: 'dialog',
    loadChildren: () => import('./plan/plan-dialog.module').then(m => m.PlanDialogModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'paragraph',
    outlet: 'dialog',
    loadChildren: () => import('./task/task-dialog.module').then(m => m.TaskDialogModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'chapter',
    outlet: 'dialog',
    loadChildren: () => import('./chapter/chapter-dialog.module').then(m => m.ChapterDialogModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'sked',
    outlet: 'dialog',
    loadChildren: () => import('./sked/sked-dialog.module').then(m => m.SkedDialogModule),
    canLoad: [AuthGuard],
  },
  {
    path: '',
    outlet: 'dialog',
    component: DialogLoadingComponent,
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialogRoutingModule {}
