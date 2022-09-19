import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OphCardModule} from '../../design/oph-card/oph-card.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {OphMenuModule} from '../../design/oph-menu/oph-menu.module';
import {TaskDeleteDialogModule} from '../delete-dialog/task-delete-dialog.module';
import {TaskCardContentComponent} from './card/content/task-card-content.component';
import {TaskCardMenuComponent} from './card/menu/task-card-menu.component';
import {TaskCardComponent} from './card/task-card.component';
import {TasksListComponent} from './tasks-list.component';

@NgModule({
  imports: [CommonModule, OphCardModule, OphMenuModule, OphIconModule, TaskDeleteDialogModule],
  declarations: [TasksListComponent, TaskCardComponent, TaskCardContentComponent, TaskCardMenuComponent],
  exports: [TasksListComponent],
})
export class TasksListModule {}
