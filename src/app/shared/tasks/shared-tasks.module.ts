import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TasksSearchPanelModule} from './search-panel/tasks-search-panel.module';
import {TaskFormModule} from './form/task-form.module';
import {TasksListModule} from './list/tasks-list.module';
@NgModule({
  imports: [CommonModule, TasksSearchPanelModule, TasksListModule, TaskFormModule],
  exports: [TasksSearchPanelModule, TasksListModule, TaskFormModule],
})
export class SharedTasksModule {}
