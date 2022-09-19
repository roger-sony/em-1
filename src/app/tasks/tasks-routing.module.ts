import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksListComponent} from './list/tasks-list.component';
import {TaskDetailComponent} from './detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TasksListComponent,
    data: {
      bottomNavShown: true,
      mobileSearchShown: true,
    },
  },
  {
    path: ':taskId',
    component: TaskDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
