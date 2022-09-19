import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewSkedTemplateDialogComponent} from './new-template/new-sked-template-dialog.component';
import {SkedTaskListDialogComponent} from './sked-task-list-dialog/sked-task-list-dialog.component';

const dialogRoutes: Routes = [
  {
    path: `new-template`,
    component: NewSkedTemplateDialogComponent,
  },
  {
    path: `task-list/:taskIds`,
    component: SkedTaskListDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(dialogRoutes)],
  exports: [RouterModule],
})
export class SkedDialogRoutingModule {}
